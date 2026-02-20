"""Language detection with SpeechBrain + Hugging Face Hub compatibility shim.

This script works around the error:
    hf_hub_download() got an unexpected keyword argument 'use_auth_token'

The workaround is to patch `huggingface_hub.hf_hub_download` before importing
SpeechBrain so older SpeechBrain versions that still pass `use_auth_token`
continue to work with newer `huggingface_hub` releases.
"""

from __future__ import annotations

import inspect
from pathlib import Path

import huggingface_hub
import torchaudio


# --- Compatibility patch (must happen before importing speechbrain) ---------
if "use_auth_token" not in inspect.signature(huggingface_hub.hf_hub_download).parameters:
    _hf_hub_download = huggingface_hub.hf_hub_download

    def _hf_hub_download_compat(*args, use_auth_token=None, **kwargs):
        if use_auth_token is not None and "token" not in kwargs:
            kwargs["token"] = use_auth_token
        return _hf_hub_download(*args, **kwargs)

    huggingface_hub.hf_hub_download = _hf_hub_download_compat


from speechbrain.inference import EncoderClassifier


def detect_language(audio_path: str) -> tuple[str, float]:
    """Detect the language of an audio file.

    Returns:
        (predicted_language_label, confidence_score)
    """
    model = EncoderClassifier.from_hparams(
        source="speechbrain/lang-id-voxlingua107-ecapa",
        savedir="tmp/lang-id-voxlingua107-ecapa",
    )

    # Optional preflight check for a clearer error.
    audio_file = Path(audio_path)
    if not audio_file.exists():
        raise FileNotFoundError(f"Audio file not found: {audio_path}")

    # Validate that torchaudio can read the file.
    torchaudio.load(str(audio_file))

    out_prob, score, index, text_lab = model.classify_file(str(audio_file))
    predicted_label = text_lab[0][0]
    confidence_score = float(score[0].item())

    return predicted_label, confidence_score


if __name__ == "__main__":
    audio_file = "sample.wav"
    try:
        label, probability = detect_language(audio_file)
        print(f"Detected Language: {label}")
        print(f"Confidence: {probability:.4f}")
    except Exception as exc:
        print(f"An error occurred: {exc}")

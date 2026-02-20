# SpeechBrain language detection compatibility note

If you hit this runtime error:

`hf_hub_download() got an unexpected keyword argument 'use_auth_token'`

it means your `speechbrain` version expects an older Hugging Face Hub API.
Use `speechbrain_lang_detect.py`, which applies a small compatibility shim
before importing SpeechBrain.

## Alternative fix via package versions

You can also fix this by aligning dependency versions:

- Upgrade SpeechBrain to a version compatible with your `huggingface_hub`, or
- Pin `huggingface_hub` to an older version that still supports `use_auth_token`.

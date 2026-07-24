"""Minimal PyYAML-compatible shim for local plugin validation.

This covers the simple YAML frontmatter used by this plugin's SKILL.md files.
It is intentionally small so validation does not depend on a global Python
environment or network-installed packages.
"""

from __future__ import annotations


class YAMLError(Exception):
    pass


def safe_load(source: str) -> dict[str, object] | None:
    if not source.strip():
        return None

    result: dict[str, object] = {}
    current_mapping: dict[str, object] | None = None
    for line_number, raw_line in enumerate(source.splitlines(), start=1):
        stripped = raw_line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if ":" not in stripped:
            raise YAMLError(f"expected key/value pair on line {line_number}")

        key, raw_value = stripped.split(":", 1)
        key = key.strip()
        if not key:
            raise YAMLError(f"empty key on line {line_number}")
        indentation = len(raw_line) - len(raw_line.lstrip(" "))

        if indentation == 0:
            parsed_value = _parse_scalar(raw_value.strip())
            if parsed_value is None and raw_value.strip() == "":
                current_mapping = {}
                result[key] = current_mapping
            else:
                current_mapping = None
                result[key] = parsed_value
            continue

        if indentation == 2 and current_mapping is not None:
            current_mapping[key] = _parse_scalar(raw_value.strip())
            continue

        raise YAMLError(f"unsupported indentation on line {line_number}")

    return result


def _parse_scalar(value: str) -> object:
    if value == "":
        return None
    if value in ("true", "True"):
        return True
    if value in ("false", "False"):
        return False
    if value in ("null", "Null", "~"):
        return None
    if (
        len(value) >= 2
        and value[0] == value[-1]
        and value[0] in ("'", '"')
    ):
        return value[1:-1]
    return value

# Plans

Wave-based delivery for DTS-WEB V2.

| File | Role |
|------|------|
| [status.md](status.md) | Overall execution status board |
| [wave-00-bootstrap.md](wave-00-bootstrap.md) … [wave-05-*.md](wave-05-quality-launch.md) | Per-wave scope |

## How to work

Follow Cursor rule **Plan → Execute → Test → Fix → Document**:

1. Read/update the active wave file under `plans/`
2. Implement only that wave’s scope
3. Test (build / AR-EN / theme / hashes as relevant)
4. Fix failures
5. Update `status.md` + wave file; update `docs/` if structure or business changed

## Links

- Structural docs: [`docs/`](../docs/)
- Cursor rules: [`.cursor/rules/`](../.cursor/rules/)

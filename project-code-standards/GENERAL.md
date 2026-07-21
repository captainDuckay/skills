# General Standards

Apply these conventions to every affected work area in a way that is idiomatic for its language and consistent with the project's established architecture.

## Functional-first design

- Prefer pure functions for domain logic when practical.
- Place pure logic in the nearest idiomatic, domain-local module. Follow the language and project's existing structure rather than introducing a technology-specific file pattern.
- Keep side effects at system boundaries such as framework integration, API calls, persistence, I/O, and UI wiring.
- Keep domain logic out of components and service classes when a pure domain abstraction expresses it more clearly.

For example, separate a price calculation from the operation that loads or saves an order. The calculation belongs in a pure domain abstraction; persistence remains at the boundary.

## Intention-revealing control flow

- Prefer declarative composition when it is idiomatic and at least as clear as imperative flow.
- Prefer data-driven mappings over long conditional chains when behavior is selected by data.
- Use imperative flow when it improves clarity, performance, resource handling, or framework integration.
- Explain only surprising or non-obvious trade-offs; ordinary idiomatic control flow needs no justification comment.

## Meaningful numeric literals

Name a numeric literal when the name adds domain meaning, units, policy context, or protocol meaning. Typical candidates include:

- Timeouts and durations
- Limits and thresholds
- Retry policies
- Rates and percentages
- Protocol or status values

Include units in names when relevant, such as `sessionTimeoutMs` or `MaxRetryCount`.

Keep a literal inline when its meaning is locally obvious and extraction would reduce readability. Apply the same test in production code and tests.

## Boy Scout cleanup

- Leave the directly affected area cleaner when a nearby improvement is safe and relevant.
- Keep cleanup proximal to files and domains already involved in the task.
- Track and summarize cleanup separately from the primary change.
- When the user requests commits, put cleanup in a separate commit using the dedicated commit skill.
- When commits are not requested, leave the changes uncommitted.

# The conversation

Ask for an outcome in the web client. Register the folders this chat may use under **Settings → Prism**. The conversation agent can look up those projects by ID. [Set up two projects](/guide/start) A useful first request is “Review the mobile release checklist and summarize the missing checks.”

## Choose a conversation model

The model picker sits inside the composer, immediately to the left of Send. Open it to read each L1 model’s description. Selecting a model affects subsequent turns and preserves your draft. Enter sends a message; Shift+Enter adds a line.

## Follow a task

A collapsed card appears for delegated work. Expand it to see its status and execution steps. Ask a follow-up in the same conversation if priorities change. The planning agent can report an update while other steps continue.

![Two completed project tasks, event details and the selected model](./screens/en/16-results.png)

## Read the underlying session

Open the task’s read-only session to inspect the recorded dialogue and tool names. Refresh for newer records. The viewer checks ownership and reads without taking a writer lock. Web windows signed into the same DSH owner share a conversation; messaging identities have their own histories.

![The bookshop executor’s read tool and the README lines it returned](./screens/en/17-harbor-books-read-only-session.png)

[Messaging apps](/guide/im) · [Roles and permissions](/develop/layers)

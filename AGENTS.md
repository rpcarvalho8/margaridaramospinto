<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Never relax or drop an existing column constraint (drop a column/table, drop NOT NULL, change a type) in a migration: the user requires additive, zero-downtime schema changes. Where the app must express "no value" for a non-null column, write an empty string from application code instead of altering the column, and mark anything the app stops using as DEPRECATED with a COMMENT rather than removing it.

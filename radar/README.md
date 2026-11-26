# Interview Radar activation

The public site supports Browse reporting, question-card reporting, role filters, rankings, and short practice sessions. With empty public configuration, it displays “Reporting setup pending” and leaves the ordinary study features available.

## Connect the backend

1. Use a dedicated Supabase project. Apply `001-reports.sql` as a migration using the SQL editor or deployment tooling.
2. Set the Auth Site URL to `https://iangumi.github.io/qa-interview-practice/`. For both **Confirm signup** and **Magic link**, use an email template with this link. The site uses an intentional confirmation button to avoid consuming the token during email prefetching.

   ```html
   <a href="{{ .SiteURL }}#radar-confirm={{ .TokenHash }}">Sign in to Interview Radar</a>
   ```

3. Configure a custom SMTP sender that can reach public users. Supabase’s default sender only reaches project team addresses. Turn off click tracking for verification emails so the link reaches the intended URL.
4. Set `url` and `publishableKey` in `radar-config.js` to the project URL and browser-safe publishable key. Production secret keys and SMTP credentials belong in the provider settings.
5. Verify email delivery to a real non-team address, then check reporting, undo, role filters, and the five-report threshold in a test project before announcing public voting.

## Counting rules

The server derives the voter from a confirmed account. It accepts one active report per account per canonical question group, with a daily cap of 25 new questions. Repeat submissions and undo followed by re-reporting keep the original timestamp and role within the 90-day window. The public API returns only groups with five distinct accounts in the requested role view. Dates are rounded to UTC days. Reports are from this community and do not estimate interview probability.

The report table stores a user ID, group, optional role, and timestamp. It has no public table access. Account email is held by Supabase Auth. Review your project's account and data-retention settings before public launch.

When adding questions, add their IDs and group mappings in a new database migration. Keep the canonical mappings in `radar-groups.js` consistent with database migrations so duplicate prompts share a count and report state.

[Passwordless email sign-in](https://supabase.com/docs/guides/auth/auth-email-passwordless) · [Custom SMTP setup](https://supabase.com/docs/guides/auth/auth-smtp)

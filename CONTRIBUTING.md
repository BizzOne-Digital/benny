# Contributing to Team TEXAS Special Needs

Thank you for your interest in contributing to this project!

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/team-texas-special-needs.git
   cd team-texas-special-needs
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
5. **Run database seed:**
   ```bash
   npm run seed
   ```
6. **Start development server:**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/component-name` - Code refactoring

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add testimonial rating system
fix: resolve mobile menu not closing
docs: update deployment guide
refactor: simplify service card component
```

### Code Style

- Use TypeScript strict mode
- Follow existing code patterns
- Run linter before committing: `npm run lint`
- Run type check: `npm run type-check`
- Use Prettier for formatting

### Testing

- Write tests for new features
- Run tests before committing: `npm test`
- Add E2E tests for critical user flows
- Ensure tests pass: `npm run test:e2e`

## Making Changes

### Adding a New Model

1. Create schema in `src/models/`
2. Add validation in `src/lib/validations.ts`
3. Create API routes in `src/app/api/`
4. Add admin UI in `src/app/admin/`
5. Add public route if needed
6. Update seed script
7. Add tests

### Adding a New Page

1. Create route in `src/app/(public)/`
2. Add to navigation in `Header.tsx`
3. Add to sitemap
4. Create admin management page
5. Add metadata
6. Test responsive design
7. Check accessibility

### Modifying Database Schema

1. Update model in `src/models/`
2. Update validation schema
3. Update seed data
4. Test migration on local database
5. Document changes in PR

## Pull Request Process

1. **Update your fork:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes**

4. **Test thoroughly:**
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

6. **Open a Pull Request** with:
   - Clear title and description
   - Screenshots for UI changes
   - List of breaking changes
   - Testing instructions

## Code Review

- Be respectful and constructive
- Address all comments
- Keep PRs focused and small
- Update based on feedback

## Reporting Issues

When reporting bugs, include:

- Environment (OS, Node version, browser)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/error logs
- Minimal reproduction code

## Questions?

- Check existing issues and PRs
- Review documentation
- Ask in discussions

## License

By contributing, you agree that your contributions will be licensed under the project's license.

Thank you for contributing! 🎉

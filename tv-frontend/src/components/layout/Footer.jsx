import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-xl">
      <div className="w-full px-margin md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-xs">
          <div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container text-[14px]">
              movie
            </span>
          </div>
          <span className="font-headline-sm text-headline-sm text-primary-container tracking-wider">
            CINETRACK
          </span>
          <span className="text-tertiary font-body-sm text-body-sm pl-space-sm">
            © 2025 CineTrack Platform. Personal Library Engine.
          </span>
        </div>

        <div className="flex items-center gap-space-lg text-tertiary font-body-sm text-body-sm">
          <Link className="hover:text-on-surface transition-colors" href="#">
            Changelog
          </Link>
          <Link className="hover:text-on-surface transition-colors" href="#">
            API Sync
          </Link>
          <Link className="hover:text-on-surface transition-colors" href="#">
            Statistics
          </Link>
          <Link className="hover:text-on-surface transition-colors" href="#">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

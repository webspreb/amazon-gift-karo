import { AffiliateDisclosure } from './AffiliateDisclosure';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">CuratedGift</h3>
            <p className="mt-2 text-sm text-gray-600">
              Curated, unexpected gift ideas for every Indian festival and occasion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Browse</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="/festivals/diwali" className="hover:text-amber-600">Diwali Gifts</a></li>
              <li><a href="/occasions/birthday" className="hover:text-amber-600">Birthday Gifts</a></li>
              <li><a href="/vibes/romantic" className="hover:text-amber-600">Romantic Gifts</a></li>
              <li><a href="/vibes/sentimental" className="hover:text-amber-600">Sentimental Gifts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Info</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-amber-600">About</a></li>
              <li><a href="/privacy" className="hover:text-amber-600">Privacy</a></li>
              <li><a href="/contact" className="hover:text-amber-600">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <AffiliateDisclosure />
          <p className="mt-2 text-xs text-gray-400">© 2026 CuratedGift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

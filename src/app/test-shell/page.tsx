import { AdminShell } from "@/components/app-shell/admin-shell";
import { PageContent } from "@/components/page/page-content";
import { PageContentSection } from "@/components/page/page-content-section";
import { PageTopBar } from "@/components/page/page-top-bar";

export default function TestShellPage() {
  return (
    <AdminShell>
      <PageContent>
        <div className="space-y-8">
          <PageTopBar
            title="Add Products"
            navigation={[
              {
                label: "Home",
                href: "/dashboard",
              },
              {
                label: "Add Products",
              },
            ]}
          />

          <PageContentSection title="Products Description">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="product-name"
                  className="text-sm font-medium"
                >
                  Product Name
                </label>

                <input
                  id="product-name"
                  type="text"
                  placeholder="Enter product name"
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium"
                >
                  Category
                </label>

                <select
                  id="category"
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="vehicle">Vehicle</option>
                  <option value="equipment">Equipment</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="brand"
                  className="text-sm font-medium"
                >
                  Brand
                </label>

                <select
                  id="brand"
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                >
                  <option value="" disabled>
                    Select brand
                  </option>
                  <option value="brand-one">Brand One</option>
                  <option value="brand-two">Brand Two</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="colour"
                  className="text-sm font-medium"
                >
                  Colour
                </label>

                <select
                  id="colour"
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                >
                  <option value="" disabled>
                    Select colour
                  </option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="weight"
                  className="text-sm font-medium"
                >
                  Weight (KG)
                </label>

                <input
                  id="weight"
                  type="number"
                  placeholder="15"
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="length"
                  className="text-sm font-medium"
                >
                  Length (CM)
                </label>

                <input
                  id="length"
                  type="number"
                  placeholder="120"
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  rows={6}
                  placeholder="Product description"
                  className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[#ed1b64] focus:ring-2 focus:ring-[#ed1b64]/20"
                />
              </div>
            </div>
          </PageContentSection>
        </div>
      </PageContent>
    </AdminShell>
  );
}
import * as React from "react"
import { Navbar } from "@/components/demos/ecommerce/layout/navbar"
import { Footer } from "@/components/demos/ecommerce/layout/footer"
import { ProductPageContent } from "@/components/demos/ecommerce/product/ProductPageContent"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <ProductPageContent id={resolvedParams.id} />
      </main>
      <Footer />
    </>
  )
}

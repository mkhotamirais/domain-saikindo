import { Container, Title } from "@/components/wrapper";
import Image from "next/image";

const productList = [
  { image: "/images/products/uniform1.png", label: "" },
  { image: "/images/products/uniform2.png", label: "" },
  { image: "/images/products/uniform3.png", label: "" },
  { image: "/images/products/uniform4.png", label: "" },
  { image: "/images/products/uniform5.png", label: "" },
  { image: "/images/products/uniform6.png", label: "" },
  { image: "/images/products/uniform7.png", label: "" },
];

export function HomeProduct() {
  return (
    <section className="bg-gray-200">
      <Container>
        <div className="py-12">
          <Title title="Products" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {productList.map((item, i) => (
              <div key={i}>
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  alt="image product"
                  className="object-center object-contain size-72"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../(components)/FormSubmitButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/AuthOptions";

export const metadata = {
  title: "Add Product - Copyzon",
};
const addProduct = async (formData: FormData) => {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing values");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
};
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          type="text"
          className="input input-bordered mb-3 w-full"
          required
          name="name"
          placeholder="Name"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          type="url"
          className="input input-bordered mb-3 w-full"
          required
          name="imageUrl"
          placeholder="Image Url"
        />
        <input
          type="number"
          className="input input-bordered mb-3 w-full"
          required
          name="price"
          placeholder="Price"
        />
        <FormSubmitButton className=" btn-block">Add product</FormSubmitButton>
      </form>
    </div>
  );
};

export default page;

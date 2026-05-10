const BASE_URL = "http://localhost:8080";

export async function createProduct(type, productData) {
  const res = await fetch(`${BASE_URL}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error("상품 등록 실패");
  }

  return res.json();
}

export async function getProducts(type) {
  const res = await fetch(`${BASE_URL}/${type}`);

  if (!res.ok) {
    throw new Error("상품 조회 실패");
  }

  return res.json();
}

export async function getProductDetail(type, id) {
  const res = await fetch(`${BASE_URL}/${type}/${id}`);

  if (!res.ok) {
    throw new Error("상품 상세 조회 실패");
  }

  return res.json();
}

export async function deleteProduct(type, id) {
  const res = await fetch(`${BASE_URL}/${type}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("상품 삭제 실패");
  }

  return res.json();
}

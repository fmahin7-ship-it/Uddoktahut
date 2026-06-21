const roundMoney = (value) => Math.round(Number(value) * 100) / 100;

/**
 * Join cart items with catalog products for display and checkout validation.
 */
const resolveCartLines = (cartItems, products) => {
  const productById = new Map(products.map((p) => [p.id, p]));
  const lines = [];
  const orphanLines = [];
  const errors = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const product = productById.get(item.productId);

    if (!product) {
      errors.push(`Product #${item.productId} is no longer available.`);
      orphanLines.push({
        productId: item.productId,
        quantity: item.quantity,
      });
      continue;
    }

    if (product.stock < item.quantity) {
      errors.push(
        `"${product.name}" has only ${product.stock} in stock (you have ${item.quantity} in cart).`
      );
    }

    const unitPrice = roundMoney(product.price);
    const lineTotal = roundMoney(unitPrice * item.quantity);
    subtotal += lineTotal;

    lines.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice,
      quantity: item.quantity,
      stock: product.stock,
      lineTotal,
    });
  }

  const resolvedCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return {
    lines,
    orphanLines,
    subtotal: roundMoney(subtotal),
    resolvedCount,
    errors,
    isValid: lines.length > 0 && errors.length === 0,
  };
};

export { resolveCartLines };

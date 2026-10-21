
const ALLOWED_UNITS = ["g", "kg", "ml", "l", "pcs"];

function parseVariants(input) {
    let variants;

    try {
        variants =
            typeof input === "string" ? JSON.parse(input) : input;
    } catch {
        throw new Error("Variants must contain valid JSON.");
    }

    if (!Array.isArray(variants) || variants.length === 0) {
        throw new Error("At least one packet option is required.");
    }

    if (variants.length > 100) {
        throw new Error("Maximum 100 packet options are allowed.");
    }

    const seen = new Set();



    return variants.map((variant) => {
        const id =
            variant.id == null || variant.id === ""
                ? null
                : Number(variant.id);

        if (id !== null && (!Number.isInteger(id) || id <= 0)) {
            throw new Error("Invalid variant ID.");
        }

        const quantity = Number(variant.quantity);
        const price = Number(variant.price);
        const stock = Number(variant.stock ?? 0);
        const unit = variant.unit;

        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isInteger(stock) ||
            stock < 0 ||
            !ALLOWED_UNITS.includes(unit)
        ) {
            throw new Error(
                "Each packet requires a valid quantity, unit, price and stock."
            );
        }

        const key = `${quantity}:${unit}`;

        if (seen.has(key)) {
            throw new Error(
                `Duplicate packet option: ${quantity} ${unit}.`
            );
        }

        seen.add(key);

        return {
            id,
            quantity,
            unit,
            price,
            stock,
            sku: variant.sku || null,
        };
    });
}

module.exports = { parseVariants };

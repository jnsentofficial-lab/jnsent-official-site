export function formatPriceWithCommas(price: string | number): string {
    if (isNaN(Number(price))) return "0";

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

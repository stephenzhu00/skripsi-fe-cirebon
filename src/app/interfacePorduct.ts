export interface InterfaceProduct{
    productCategory:string;
    productId:number;
    productTitle:string;
    productImg:string;
    productDesc:string;
    productPrice: number;
    productRating:number;
    productQuantity:number;
}
export interface InterfaceListProduct{
    product:InterfaceProduct[];
}
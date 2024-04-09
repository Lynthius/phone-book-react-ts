import React, { ElementRef, useReducer, useRef } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductInCart = Product & { quantity: number };

const initialState: ProductInCart[] = [];

type ActionType =
  | {
      type: "add";
      payload: Product;
    }
  | {
      type: "remove";
      payload: Product["id"];
    }
  | {
      type: "change";
      payload: { id: Product["id"]; newValue: ProductInCart["quantity"] };
    }
  | { type: "clear" };

function reducer(state: typeof initialState, action: Readonly<ActionType>): typeof initialState {
  switch (action.type) {
    case "add":
      {
        console.log("state",state)
        //check if it is cart
        const existingProduct = state.find((product) => product.id === action.payload.id
        );
        console.log("existing",existingProduct)
        if (existingProduct) {
          // Jeśli produkt już istnieje w koszyku, zwiększ jego ilość
          return state.map((product) =>
            product.id === action.payload.id ? { ...product, quantity: product.quantity + 1 } : product
          );
        } else {
          // Jeśli produkt nie istnieje w koszyku, dodaj go
          return [...state, { ...action.payload, quantity: 1 }];
        }
      }

      //if yes -> change quantity
      //if no -> add to array
      return [];
    case "remove":
      {
      //check if it is cart
      const existingProduct = state.find((product) => {
          product.id === action.payload;
        });
      //if yes -> remove product
      if(existingProduct) {
        //action.payload - product ID
        return state.filter(product=> product.id !== action.payload)
      }
      //if no -> nothing
        return state;
      }
    case "change": {
      //check if it is cart
      const newCart = state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, quantity: action.payload.newValue };
        }
        return product;
      });

      //if yes -> change quantity
      //if no -> nothing
       return newCart.filter(product=> product.quantity >0)
    }
    case "clear":
      return [];
    default:
      throw new Error("Bad action type");
  }
}

//lista produktów które można dodać
const products:Product[]=[
  {id: "1", name: "test",price: 10}
]
//wyświetlić koszyk
//podłączyć akcje
export const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectRef=useRef<ElementRef<any>>(null)

  const handleAdd=()=>{
    if(selectRef && selectRef.current){
      const productId=selectRef.current.value
      const product=products.find(product=>product.id===productId)
      if(product){
        dispatch({type: "add", payload: product })
      }
    }
  }

  const handleChange=(productId:Product["id"],type:"-"|"+")=>{
     const product=state.find(product=>product.id===productId)
     console.log("product",product)
     if(!product){
      return;
     }
    if(type==="+"){
      dispatch({type: "change", payload: {id: productId, newValue: product.quantity+1} })
    }
    if(type==="-"){
      dispatch({type: "change", payload: {id: productId, newValue: product.quantity-1} })
    }
  }

  return <div>
    <select ref={selectRef}>
      {products.map(product=>{
        return <option value={product.id}>{product.name}</option>
      })}
      </select>
      <button onClick={handleAdd}>Add to cart</button>
      <div>
      User cart:
      {state.map(productInCart=>{
        return <div>
          <p>{productInCart.name} {productInCart.quantity}</p>
           <button onClick={()=>handleChange(productInCart.id,"-")}>-</button>
          
          {productInCart.quantity}
         <button onClick={()=>handleChange(productInCart.id,"+")}>+</button>
          </div>
      })}
        </div>
  </div>;
};

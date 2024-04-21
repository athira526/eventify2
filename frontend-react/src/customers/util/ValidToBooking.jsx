export function isValid(cartItems){
    console.log("cartItems -------------- ",cartItems[0].activity?.fest.id)
    const festId=cartItems[0]?.activity?.fest.id
   
    for(let item of cartItems){
        console.log("item ---- ", item.fest?.id)
      if(item.activity?.fest.id!==festId){
        return false;
      }
    }
    return true
  }
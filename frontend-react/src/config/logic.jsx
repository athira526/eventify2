export const isPresentInFavorites=(favorites,fest)=>{
    for(let item of favorites){
      if(fest.id===item.id)return true
    }
    return false;
  }
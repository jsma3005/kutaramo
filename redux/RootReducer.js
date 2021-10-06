import { combineReducers } from "redux";
import { AppReducer } from "./App/reducer";
import { CartReducer } from "./Cart/reducer";
import { FavoritesReducer } from "./Favorites/reducers";
import { LoginReducer } from "./Login/reducer";
import { MainPageReducer } from "./MainPage/reducer";
import { NewsletterReducer } from "./Newsletter/reducer";
import { OrderReducer } from "./Order/reducer";
import { ProductsReducer } from "./Products/reducer";
import { SearchReducer } from "./Search/reducer";
import { UserReducer } from "./User/reducer";

export const rootReducer = combineReducers({
    App: AppReducer,
    Login: LoginReducer,
    MainPage: MainPageReducer,
    User: UserReducer,
    Newsletter: NewsletterReducer,
    Products: ProductsReducer,
    Favorites: FavoritesReducer,
    Cart: CartReducer,
    Search: SearchReducer,
    Order: OrderReducer
})
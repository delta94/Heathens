import { isAuthenticated } from "../middlewares/protect";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class HelloResolver
{
    @UseMiddleware(isAuthenticated)
    @Query( () => String )
    hello ()
    {
        return 'worlds';
    }
}
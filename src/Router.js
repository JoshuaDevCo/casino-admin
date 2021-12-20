import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";

// Import Providers
import { AuthProvider } from "./theme";
// Import Route Providers
import { Router, Route, Switch } from "react-router-dom";
import { History, To } from "./theme";

const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const GameTypes = lazy(() => import("./pages/GameTypes"));
const Providers = lazy(() => import("./pages/Providers"));
const Games = lazy(() => import("./pages/Games"));
const Users = lazy(() => import("./pages/Users"));
const Roles = lazy(() => import("./pages/Roles"));
const Players = lazy(() => import("./pages/Players"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Profile = lazy(() => import("./pages/Profile"));

const AppRouter = () => {
    return(
        <Router history={History}>
            <Suspense fallback={<Spinner />}>
                <AuthProvider>   
                    <Switch>
                        <Route {...To("signin")} component={Signin}/>
                        <BaseLayout>
                            <Route {...To("dashboard")} component={Dashboard}/>
                            <Route {...To("roles")} component={Roles}/>
                            <Route {...To("users")} component={Users}/>
                            <Route {...To("players")} component={Players}/>
                            <Route {...To("game-types")} component={GameTypes} />
                            <Route {...To("games")} component={Games}/>
                            <Route {...To("providers")} component={Providers} />
                            <Route {...To("finance-transaction")} component={Transactions} />
                            <Route {...To("finance-request")} component={Transactions} />
                            <Route {...To("finance-deposit")} component={Transactions} />
                            <Route {...To("finance-withdraw")} component={Transactions} />
                            <Route {...To("profile")} component={Profile} />
                        </BaseLayout>
                    </Switch>
                </AuthProvider>
            </Suspense>
        </Router>
    )
}
export default AppRouter;
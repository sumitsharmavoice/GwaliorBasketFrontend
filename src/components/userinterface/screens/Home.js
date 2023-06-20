import BrandsInFocus from "../usercomponents/homepage/BestDeals";
import DealsSlider from "../usercomponents/homepage/DealsSlider";
import ExploreCategory from "../usercomponents/homepage/ExploreCategory";
import ExplorNewCategory from "../usercomponents/homepage/ExploreNewCategory";
import Footer from "../usercomponents/homepage/Footer";
import Header from "../usercomponents/homepage/Header";
import MainSlider from "../usercomponents/homepage/MainSlider";
import Spacer from "../usercomponents/homepage/Spacer";
import Trending from "../usercomponents/homepage/Trending";
import TrendingProducts from "../usercomponents/homepage/TrendingProducts";
import { useStyles } from "./HomeCss";

 
export default function Home() {

    var classes = useStyles()
    return (<div className={classes.mainContainer} >
        <div >
            <Header />
        </div>

        <Spacer />
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '90%' }}>
                <MainSlider />
            </div>

            <Spacer />

            <div style={{ width: '90%' }}>
                <DealsSlider />
            </div>
            <div style={{ width: '90%' }}>
                <Trending />
            </div>

            <Spacer />
            <div style={{ width: '90%' }}>
                <ExploreCategory />
            </div>
            <div style={{ width: '90%' }}>
                <ExplorNewCategory />
            </div>
            <div style={{ width: '90%' }}>
                <BrandsInFocus />
            </div>
            <div style={{ width: '90%' }}>
                <TrendingProducts />
            </div>
            <div style={{ width: '90%' }}>
            <Footer />
            </div>
        </div>
    </div>)
}
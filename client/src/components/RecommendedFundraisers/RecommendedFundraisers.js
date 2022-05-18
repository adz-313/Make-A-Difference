import React, { useState, useEffect } from 'react';
import FundraiserCard from './FundraiserCard/FundraiserCard';
import { Grid, Typography } from '@mui/material';

const RecommendedFundraisers = ({ web3, searchText }) => {
    const [fundraisers, setFundraisers] = useState([
        {
        "name": "Indian Forests",
        "description": "The Indian Forests' primary campaigns are Tree-Planting for Environmental Restoration and Reversing the National Urban Tree Deficit, which encourage people to improve rural, suburban, and urban ecosystems by planting and caring for trees that provide important environmental and economic benefits including pure water, clean air, and wildlife habitat.",
        "expected_amount": 300000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://www.deccanherald.com/sites/dh/files/article_images/2020/03/05/forest-1583356546.jpg",
        "state": "Bengal",
        "size": 1
    },
 {
        "name": "Sustainable Northwest",
        "description": "Sustainable Northwest brings people, ideas, and innovation together so that nature, local economies,and rural communities can thrive. At the local level, we help build strong rural communities that conserve and restore forests and rangelands. At the Federal and State policy level, we present solutions that strengthen investment in sustainable natural resource management.",
        "expected_amount": 650000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://ecologise.in/wp-content/uploads/2018/04/india_forest_cover_1518500136_980x457.jpg",
        "state": "Himachal Pradesh",
        "size": 1
    },
 {
        "name": "Northern Plains Resource Council",
        "description": "Northern Plains organizes family farmers and ranchers, small businesses, urban dwellers and ruralresidents to protect Montana's water, land, air, and working landscapes. We inspire and empower our members with the information, tools and skills necessary to give them an effective voice in thedecisions that affect their lives. Our mission is to protect water quality, family farms and ranches and our unique quality of life and pass them on, unimpaired, to future generations.",
        "expected_amount": 500000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://media.nationalgeographic.org/assets/photos/000/255/25557.jpg",
        "state": "Punjab",
        "size": 1
    },
 {
        "name": "Neighborhood Partnerships",
        "description": "Neighborhood Partnerships creates opportunity for all Indians. We build and manage strong partnerships that fuel change and progress in our community. Our programs and initiatives are designed to help us achieve the three core goals identified by the strategic planning process we undertook in 2005: build thriving communities, end homelessness and support successful residents, and create economic stability.",
        "expected_amount": 1000000,
        "status": 0,
        "category": "Community Development",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/59c64e23017db213540fb8de/1623953028789-VB29PBCC4TSNVON1XQPH/8e73f535-208b-41d5-b5b6-7bd7b4e86533-large16x9_ChattanoogaHomelessCommunity.jpeg",
        "state": "India",
        "size": 1
    },
 {
        "name": "Great River Greening",
        "description": "Great River Greening leads and inspires community-based restoration of natural areas and open spaces.Our restoration efforts help preserve natural areas, protect clean air and water, and increase urbannresidents' access to natural areas and sustainable open space. Since 1995, we have engaged nearly 20,000 volunteers in projects on both public and private land that conserve critical land habitat and affect water quality. We have established partnerships with more than 400 landowners, businesses, nonprofits, and government agencies.",
        "expected_amount": 2000000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://media.npr.org/assets/img/2022/03/16/ap100313123745_custom-6a5d91aed6d5d6a757e55b31de43c132f4174902.jpg",
        "state": "India",
        "size": 1
    },
 {
        "name": "Coastal Conservation League",
        "description": "Founded in 1989, the Coastal Conservation League works to protect the natural environment. From the white sand beaches and pristine marshes to the freshwater swamps and pine savannahs, we focus on the most efficient and effective ways to protect natural habitats, the wildlife that depends on them, and the variety of benefits they bring to this state. We envision beautiful and livable communities, surrounded by productive agricultural lands  and wild lands rich with biodiversity.",
        "expected_amount": 1500000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/%E8%8A%B1%E8%93%AE%E6%96%B0%E7%A4%BE%E6%A2%AF%E7%94%B0.jpg/220px-%E8%8A%B1%E8%93%AE%E6%96%B0%E7%A4%BE%E6%A2%AF%E7%94%B0.jpg",
        "state": "Bengal",
        "size": 1
    },
 {
        "name": "Greater Newark Conservancy",
        "description": " Greater Newark Conservancy promotes environmental stewardship to improve the quality of  life in New Delhi's urban communities.Our guiding principle is to encourage and highlight community  empowerment, pride and self-sufficiency and to foster a lifelong appreciation of our natural  world for thousands of urban residents each year. Greatest emphasis is placed on working with schools, community groups, youth organizations, senior citizens, intergenerational groups and  adolescent urban youth.",
        "expected_amount": 300000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://www.handsonblueridge.org/content/www.handsonblueridge.org/agency/31038.jpg?1434991891?area=agency",
        "state": "Delhi",
        "size": 1
    },
 {
        "name": "Dogwood Alliance",
        "description": "For over 20 years, Dogwood Alliance has worked with diverse communities, partner organizations and decision-makers to protect Southern forests across 14 states. We do this through community and grassroots organizing, holding corporations and governments accountable and working to conserve millions of acres of Southern forests.",
        "expected_amount": 2000000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head.jpg",
        "state": "Madhya Pradesh",
        "size": 1
    },
     {
        "name": "Urban Affairs Coalition",
        "description": "The Urban Affairs Coalition unites government, business, neighborhoods, and individual initiative to improve the quality of life in the region, build wealth in urban communities, and solve emerging issues.",
        "expected_amount": 300000,
        "status": 0,
        "category": "Community Development",
        "imageUrl": "https://www.tandfonline.com/doi/cover-img/10.1080/ujua20.v041.i04",
        "state": "Maharashtra",
        "size": 1
    },
     {
        "name": "Shelburne Farms",
        "description": "Shelburne Farms is a nonprofit organization educating for a sustainable future.",
        "expected_amount": 500000,
        "status": 0,
        "category": "Environment",
        "imageUrl": "https://i.natgeofe.com/n/748f1c42-0d8b-498e-85fd-88151c6f863b/01_organic_farming_i8860_20181003_11260_3x4.jpg",
        "state": "Chennai",
        "size": 1
    }
    ]);  

    // useEffect(async () => {
    //     const resp = await fetch('https://mad-dj-app.herokuapp.com/drive/')
    //     const res = await resp.json()

    //     let myfundraisers = []
    //     myfundraisers.push(res[21])
    //     myfundraisers.push(res[11])
    //     setFundraisers(myfundraisers)
    // }, [])

    return (
        <div>
            <Typography variant="h5" margin="1rem 0">You may also like to donate here</Typography>
            {/* <Grid container spacing={3}>
            {
              searchText ? 
              searchedFundraisers.length > 0 ? searchedFundraisers.map((fundraiser) => {
                  return (
                      <Grid key={fundraiser} item xs={12} sm={6} md={4}>
                          <FundraiserCard web3={web3} fundraiser={fundraiser.fundraiserID} />
                      </Grid>
                  )
                }) : <Typography sx={{ml: 3, mt: 1}} variant='h6'>No results found</Typography>
                :
                fundraisers.map((fundraiser) => {
                return (
                    <Grid key={fundraiser} item xs={12} sm={6} md={4}>
                        <FundraiserCard web3={web3} fundraiser={fundraiser} />
                    </Grid>
                )
                }) 
            }
            </Grid> */}
            <Grid container spacing={3}>
            {fundraisers.map((fundraiser) => {
                return (
                    <Grid key={fundraiser.id} item xs={12} sm={6} md={4}>
                        <FundraiserCard fundName={fundraiser.name} description={fundraiser.description} imageURL={fundraiser.imageUrl} category={fundraiser.category} />
                    </Grid>
                )
            })}
            </Grid>
            
        </div>
    )
}

export default RecommendedFundraisers

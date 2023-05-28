import React, { useState, useEffect } from 'react';
import FundraiserCard from './FundraiserCard/FundraiserCard';
import { Grid, Typography } from '@mui/material';

const RecommendedFundraisers = ({ web3, searchText }) => {
    const [fundraisers, setFundraisers] = useState([
        {
            "name": "American Forests",
            "description": "American Forests is a world leader in planting trees for environmental restoration, a pioneer in the science and practice of urban forestry, and a primary communicator of the benefits of trees and forests. American Forests is the nation's oldest citizens' conservation organization. Citizens concerned about the waste and abuse of the nation's forests founded American Forests in 1875. Today, the organization's primary campaigns are Tree-Planting for Environmental Restoration and Reversing the National Urban Tree Deficit, which encourage people to improve rural, suburban, and urban ecosystems by planting and caring for trees that provide important environmental and economic benefits including pure water, clean air, and wildlife habitat.",
            "expected_amount": 679500,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://www.openaccessgovernment.org/wp-content/uploads/2018/11/dreamstime_s_74844293.jpg",
            "state": "DC",
            "size": 0
        },
    {
            "name": "Sustainable Northwest",
            "description": "Established in 1994, Sustainable Northwest brings people, ideas, and innovation together so that nature, local economies, and rural communities can thrive. We envision a Northwest where rural communities thrive in harmony with the landscape, resilient local economies provide quality natural resource management jobs that benefit human and natural communities, and the next generation of leaders views land stewardship as an integral component of community health. At the local level, we help build strong rural communities that conserve and restore forests and rangelands. Across communities, we build networks that advance and create a strong collective voice. At the Federal and State policy level, we present solutions that strengthen investment in sustainable natural resource management.",
            "expected_amount": 350550,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://keysight-h.assetsadobe.com/is/image/content/dam/keysight/en/img/about/corporate-social-responsibility/csr_environment_1200x900.png",
            "state": "OR",
            "size": 0
        },
    {
            "name": "Northern Plains Resource Council",
            "description": "	Northern Plains organizes family farmers and ranchers, small businesses, urban dwellers and rural residents to protect Montana's water, land, air, and working landscapes. We inspire and empower our members with the information, tools and skills necessary to give them an effective voice in the decisions that affect their lives. Our mission is to protect water quality, family farms and ranches and our unique quality of life and pass them on, unimpaired, to future generations.",
            "expected_amount": 45000,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://uapcorporate.com/wp-content/uploads/2019/11/environment-modified.jpg",
            "state": "OR",
            "size": 0
        },
    {
            "name": "Neighborhood Partnerships",
            "description": "	Neighborhood Partnerships creates opportunity for all Oregonians. We build and manage strong partnerships that fuel change and progress in our community. Each year, we have impact on the lives of thousands of Oregonians through high profile collaborations and initiatives and through nurturing leaders. We create opportunity for low income people where they live - in their neighborhoods both urban and rural. And all of what we do we is based on the strength of our partnership with community leaders, with other organizations, with governments, and with funders and contributors. Our programs and initiatives are designed to help us achieve the three core goals identified by the strategic planning process we undertook in 2005: build thriving communities, end homelessness and support successful residents, and create economic stability.",
            "expected_amount": 388800,
            "status": 0,
            "category": "Community Development",
            "imageUrl": "https://patimes.org/wp-content/uploads/2015/01/Hatcher-jan.jpg",
            "state": "OR",
            "size": 0
        },
    {
            "name": "Great River Greening",
            "description": "Great River Greening leads and inspires community-based restoration of natural areas and open spaces. Our restoration efforts help preserve natural areas, protect clean air and water, and increase urban residents' access to natural areas and sustainable open space. Since 1995, we have engaged nearly 20,000 volunteers in projects on both public and private land that conserve critical land habitat and affect water quality. By mobilizing and educating citizens to restore woods, prairies, and other natural resources in their communities, we are building a community of individuals who will be good stewards of these natural areas in the future. Overall, we have established partnerships with more than 400 landowners, businesses, nonprofits, and government agencies.",
            "expected_amount": 1050000,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://www.iata.org/contentassets/139d686fa8f34c4ba7a41f7ba3e026e7/environment_01.jpg",
            "state": "MN",
            "size": 0
        },
    {
            "name": "Coastal Conservation League",
            "description": "Founded in 1989, the Coastal Conservation League works to protect the natural environment of the South Carolina coastal plain and to enhance the quality of life of our communities by working with individuals, businesses and government to ensure balanced solutions. From the white sand beaches and pristine marshes to the freshwater swamps and pine savannahs, we focus on the most efficient and effective ways to protect natural habitats, the wildlife that depends on them, and the variety of benefits they bring to this state. We also believe that the communities we live in are important, and that our quality of life deserves the same high level of attention. We envision beautiful and livable communities, surrounded by productive agricultural lands and wild lands rich with biodiversity.",
            "expected_amount": 897650,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://www.deccanherald.com/sites/dh/files/article_images/2020/03/05/forest-1583356546.jpg",
            "state": "SC",
            "size": 0
        },
    {
            "name": "Greater Newark Conservancy",
            "description": "Greater Newark Conservancy promotes environmental stewardship to improve the quality of life in New Jersey's urban communities. Founded in 1987, the Conservancy has four program areas--environmental education, community greening and gardening, job training and advocacy for environmental justice. Our guiding principle is to encourage and highlight community empowerment, pride and self-sufficiency and to foster a lifelong appreciation of our natural world for thousands of urban residents each year. Greatest emphasis is placed on working with schools, community groups, youth organizations, senior citizens, intergenerational groups and adolescent urban youth.",
            "expected_amount": 390000,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://cdn.continental.com/fileadmin/_processed_/c/c/csm_weltkugel_eedff9b2e2.jpg",
            "state": "NJ",
            "size": 0
        },
    {
            "name": "Dogwood Alliance",
            "description": "For over 20 years, Dogwood Alliance has worked with diverse communities, partner organizations and decision-makers to protect Southern forests across 14 states. We do this through community and grassroots organizing, holding corporations and governments accountable and working to conserve millions of acres of Southern forests.",
            "expected_amount": 750000,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://c.tadst.com/gfx/750w/four-hands-holding-saplings-in-soil.jpg",
            "state": "NC",
            "size": 0
        },
    {
            "name": "Urban Affairs Coalition",
            "description": "The Urban Affairs Coalition unites government, business, neighborhoods, and individual initiative to improve the quality of life in the region, build wealth in urban communities, and solve emerging issues.",
            "expected_amount": 650000,
            "status": 0,
            "category": "Community Development",
            "imageUrl": "https://www.bolton.ac.uk//assets/Uploads/The-roll-of-a-community-dev-worker.jpg",
            "state": "PA",
            "size": 0
        },
    {
            "name": "Shelburne Farms",
            "description": "Shelburne Farms is a nonprofit organization educating for a sustainable future.",
            "expected_amount": 700000,
            "status": 0,
            "category": "Environment",
            "imageUrl": "https://c.tadst.com/gfx/750w/four-hands-holding-saplings-in-soil.jpg",
            "state": "VT",
            "size": 0
        },
        {
            "name": "Time of Grace Ministry",
            "description": "Time of Grace is a donor supported, international Christian outreach media ministry that connects people to God's grace through Jesus Christ so that they know they are loved and forgiven. Time of Grace uses television, print, social networking and the web to reach people throughout the world each week with Bible studies that are understandable and interesting. Time of Grace's vision is to ignite spiritual growth and renewal in all people that produces a joyful life now and forever.",
            "expected_amount": 679500,
            "status": 0,
            "category": "Religion",
            "imageUrl": "https://blog.ipleaders.in/wp-content/uploads/2018/01/BV-Acharya-17.jpg",
            "state": "WI",
            "size": 0
        },
    {
            "name": "Grace Place for Children and Families",
            "description": "Grace Place for Children and Families is an educational nonprofit organization guided by our faith-based core values. The idea of grace comes from the generosity of God. Grace Place expresses this generosity as an educational center that provides pathways out of poverty through educating children and families. A large number of our donors and volunteers come to Grace Place through their faith communities. Grace Place does not proselytize. This means that we will not offer assistance on the expressed or implied condition that people must either adhere to or convert to a particular faith. The mission of Grace Place is to put our faith into action – providing pathways out of poverty by educating children and families. What a wonderful way to fulfill the greatest commandments, to love God and neighbor! Our vision is that all families have access to education to break the cycle of poverty.",
            "expected_amount": 350550,
            "status": 0,
            "category": "Education",
            "imageUrl": "https://static.toiimg.com/thumb/msid-87790933,imgsize-52298,width-400,resizemode-4/87790933.jpg",
            "state": "FL",
            "size": 0
        },
    {
            "name": "Pastoral Leadership Institute",
            "description": "Partnering with God in building leaders with a Kingdom Vision.",
            "expected_amount": 45000,
            "status": 0,
            "category": "Religion",
            "imageUrl": "https://storage.googleapis.com/bhshealth-prod-assets/uploads/4087c024-bible-2050x1367.jpg",
            "state": "IL",
            "size": 0
        },
    {
            "name": "Grapevine Relief And Community Exchange",
            "description": "Organized in 1987, Grapevine Relief And Community Exchange (GRACE) is a Grapevine, Texas based relief agency which provides food, clothing, financial assistance, shelter and medical care. The impact of GRACE can be seen in the diabetic client who reversed his diagnosis through health education classes at the free GRACE Community Clinic, or the Mom who can provide new Christmas gifts to her children when she came to GRACE desperately focused on keeping the electricity from being shut off, or the young woman in Transitional Housing who enrolled in medical school and is starting her life again after fleeing domestic violence. GRACE is the place where people in need find kindness, compassion and hope to overcome their difficulties and begin again.",
            "expected_amount": 388800,
            "status": 0,
            "category": "Human Services",
            "imageUrl": "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/636020306-1532270766.jpg",
            "state": "TX",
            "size": 0
        },
    {
            "name": "Victory in Grace Ministries",
            "description": "Founded in 2001, the mission of Victory in Grace is to help every person begin a relationship with Jesus Christ through acceptance of the Gospel of grace; to help believers grow by providing regular verse-by-verse Bible teaching, helpful books and resources and regular participation in a Bible-believing and teaching local church. Our goal is to help every person find victory in life through God's abundant grace. Whether it's through a radio or television broadcast in the United States, an orphanage and child-care facility in India, literature in the dark of prisons, we're doing our best to fulfill God's call to share His love with the world.",
            "expected_amount": 1050000,
            "status": 0,
            "category": "Religion",
            "imageUrl": "https://cdn.theatlantic.com/thumbor/mZQJtvg2_NuWtRHLy4kMftihbRg=/203x0:1403x900/1200x900/media/img/mt/2017/07/NewReligions/original.jpg",
            "state": "IL",
            "size": 0
        },
    {
            "name": "Grace Centers of Hope",
            "description": "Grace Centers of Hope is Oakland County's oldest and largest homeless shelter providing hope and help since 1942. Today, Grace Centers of Hope is considered one of the leading faith-based organizations in Southeastern Michigan daily confronting issues of homelessness, addiction, poverty and spiritual emptiness. On any given night, Grace Centers of Hope will accommodate between 150-200 men, women and children. Each year we serve over 100,000 meals and provide over 55,000 nights of stay. Grace Centers of Hope is a Christian organization committed to positively changing the lives of the homeless, addicted and unwanted through the Gospel of Jesus Christ, personal accountability, life skills education and work-related programs.",
            "expected_amount": 897650,
            "status": 0,
            "category": "Human Services",
            "imageUrl": "https://i.pinimg.com/474x/3e/30/d5/3e30d5f044c9be8e25dd21ca05f418ea--vector-vector-social-work.jpg",
            "state": "MI",
            "size": 0
        },
    {
            "name": "The Society of St. Andrew",
            "description": "The Society of St. Andrew envisions a world without hunger, in which physical and spiritual hungers are met through God's grace and abundance. Basing its work in core values of faith, compassion, stewardship, and service, the Society of St. Andrew's mission is to introduce people to God's grace in Jesus Christ through meeting their hungers: Food for the body; God's word for the spirit; Community of love for the heart; and Opportunity for those who desire action.",
            "expected_amount": 390000,
            "status": 0,
            "category": "Human Services",
            "imageUrl": "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2020/01/08140917/social-worker-with-clients-500x334.jpg",
            "state": "VA",
            "size": 0
        },
    {
            "name": "Serge",
            "description": "Serge (formerly World Harvest Mission) is a missions sending agency. Today, we have over 200 missionaries in 16 countries. We believe the motive and power for mission is the gospel of grace at work in the life of a believer. Our vision is to see movements of churches empowered by grace for the world's good and God's glory. We pursue this vision through holistic, incarnational ministry. Serge exists to see individuals, families, communities, and cultures so changed and renewed by the gospel of grace that they passionately pursue their role in the great story of redemption.",
            "expected_amount": 750000,
            "status": 0,
            "category": "Religion",
            "imageUrl": "https://www.pitmanroaringtimes.com/wp-content/uploads/2020/05/GettyImages-512421423-900x675.jpg",
            "state": "PA",
            "size": 0
        },
    {
            "name": "Visalia Rescue Mission",
            "description": "Partnering with Central California to serve the poor and those in need with the love and power of the gospel of Christ, so they may become God-dependent and contributing members of their community.",
            "expected_amount": 650000,
            "status": 0,
            "category": "Human Services",
            "imageUrl": "https://www.bolton.ac.uk//assets/Uploads/The-roll-of-a-community-dev-worker.jpg",
            "state": "CA",
            "size": 0
        },
    {
            "name": "Grace to You",
            "description": "From offices around the world, Grace to You extends John MacArthur's verse-by-verse Bible teaching using modern media - radio, television, books, and the World Wide Web. The Grace to You radio program airs more than 800 times daily on stations around the world, and it reaches all major population centers in the United States. In addition to producing daily radio programs for nearly 2,000 English and Spanish radio outlets worldwide, Grace to You distributes books, software, CDs, and MP3s by John MacArthur. Since 1969, Grace to You has distributed more than twenty million audio messages and has satellite offices in Canada, Europe, India, New Zealand, and Singapore.",
            "expected_amount": 700000,
            "status": 0,
            "category": "Religion",
            "imageUrl": "https://cdn.givingcompass.org/wp-content/uploads/2019/07/26131311/A-Closer-Look-at-How-Religious-Restrictions-Have-Risen-Around-the-World.jpg",
            "state": "CA",
            "size": 0
        },
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

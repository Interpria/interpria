-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 01, 2025 at 04:15 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interpria`
--

-- --------------------------------------------------------

--
-- Table structure for table `attraction`
--

CREATE TABLE `attraction` (
  `attraction_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `province` varchar(45) DEFAULT NULL,
  `country` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `is_close` tinyint(1) DEFAULT 0,
  `website` varchar(255) DEFAULT NULL,
  `category` enum('museum','art','nature','historical','religion','other') NOT NULL DEFAULT 'museum',
  `longitude` decimal(9,6) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `attraction`
--

INSERT INTO `attraction` (`attraction_id`, `name`, `description`, `address`, `postal_code`, `city`, `province`, `country`, `email`, `phone`, `is_close`, `website`, `category`, `longitude`, `latitude`, `created_at`, `updated_at`) VALUES
(1, '299 Queen Street West', 'A monumental building that was once dedicated to engaging the youth through popular music and popular television series.', '299 Queen St W', 'M5V 2Z5', 'Toronto', NULL, 'Canada', '', '416-384-6104', 0, 'https://www.much.com/', 'other', -79.390440, 43.649420, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(2, 'Aga Khan Museum', 'Dedicated to sharing the artistic, intellectual, and scientific contributions that Islamic civilizations and cultures have made to world heritage.', '77 Wynford Dr', 'M3C 1K1', 'Toronto', NULL, 'Canada', '', '416-646-4677', 0, 'https://www.agakhanmuseum.org/', 'museum', -79.332230, 43.725260, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(3, 'Al Green Theatre (at the Miles Nadal Jewish C', 'The Al Green Theatre is used  for social and corporate event theatre film concerts dance; and lectures.', '750 Spadina Ave', 'M5S 2J2', 'Toronto', NULL, 'Canada', '', '416-924-6211', 0, 'http://www.algreentheatre.ca/', 'art', -79.403950, 43.666410, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(4, 'Alexander Muir Memorial Gardens', 'Named after the famous composer Alexander Muir. The gardens act as a path into the tranquil ravine system that includes walking trails. The gardens are open year round.', '2901 Yonge St', 'M4N 3N8', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/193/index.html', 'nature', -79.401200, 43.721570, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(5, 'Allan Gardens', 'Allan Gardens is a park and indoor botanical garden built in 1910. The building houses six greenhouses featuring plants and flowers from across the globe. Open year round and free to the public.', '19 Horticultural Ave', 'M5A 2P2', 'Toronto', NULL, 'Canada', '', '416-392-7288', 0, 'https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/beaches-gardens-attractions/gardens-and-horticulture/conservatories/allan-gardens-conservatory/', 'nature', -79.374580, 43.661530, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(6, 'Alumnae Theatre', 'The theatre company is housed inside an old firehall and is the oldest theatre society in Toronto. Each year the company offers three productions.', '70 Berkeley St', 'M5A 2W6', 'Toronto', NULL, 'Canada', '', '416-364-4170', 0, 'https://www.alumnaetheatre.com/', 'art', -79.364980, 43.652730, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(7, 'Arcadia Earth', 'Arcadia Earth is a multi-sensory journey that combines creative art installations and exciting technology that showcases the beauty of our planet.', '486 Front St', 'M5V 0V2', 'Toronto', NULL, 'Canada', 'None', 'None', 0, 'https://www.arcadiaearth.ca/', 'other', -79.397000, 43.642970, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(8, 'Art Gallery of Ontario', 'The Art Gallery of Ontario (AGO) is one of the largest art galleries in North America, and holds more than 80,000 works in its collection. In 2008 the building was redesigned by famous architect and native Torontonian, Frank Gehry.', '317 Dundas St W', 'M5T 1G4', 'Toronto', NULL, 'Canada', '', '416-979-6648', 0, 'https://ago.ca/', 'art', -79.392530, 43.653600, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(9, 'Art Museum at the University of Toronto', 'Originally opened in 1996 The Arts centre puts a special focus on study collections.', '15 King\'s College Crcl', 'M5S 3H7', 'Toronto', NULL, 'Canada', '', '416-978-1838', 0, 'https://artmuseum.utoronto.ca/', 'art', -79.395790, 43.663160, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(10, 'Artscape Wychwood Barns', 'A heritage building converted into a community centre that hosts many events, festivals, farmers market and a children\'s theatre.', '601 Christie St', 'M6G 4C7', 'Toronto', NULL, 'Canada', '', '647-696-6962', 0, 'https://artscapewychwoodbarns.ca/', 'other', -79.423840, 43.679890, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(11, 'Ashbridges Bay Park', 'Ashbridges Bay waterfront park features large beaches, fishing areas, a marina, and the Woodbine Beach boardwalk.', '1561 Lake Shore Blvd E', 'M4L 3W6', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/1/index.html', 'nature', -79.310330, 43.659960, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(12, 'Balmy Beach Park', 'Created in 1903, the historic park features a lawn bowling club, a playground and outdoor fitness equipment.', '1 Beech Ave', 'M4E 1A7', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/parks-and-recreation-facilities/location/?id=427&title=Balmy-Beach-Park', 'nature', -79.284190, 43.670570, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(13, 'BAPS Shri Swaminarayan Mandir', 'This unique-to-Canada architectural monument is made with 24,000 pieces of marble and stone. Discover the more than 10,000-year-old heritage of India.', '61 Claireville Dr', 'M9W 5Z7', 'Toronto', NULL, 'Canada', '', '416-798-2277', 0, 'http://www.baps.org/Global-Network/North-America/Toronto.aspx', 'other', -79.626760, 43.738650, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(14, 'Bata Shoe Museum', 'Home to hundreds of shoes (from a collection numbering over 13,000). The museum celebrates the style and function of footwear in impressive galleries from ancient Egypt to modern fashion.', '327 Bloor St W', 'M5S 1W7', 'Toronto', NULL, 'Canada', '', '416-979-7799', 0, 'https://batashoemuseum.ca/', 'museum', -79.400190, 43.667290, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(15, 'Beanfield Centre', 'The Beanfield Centre (formerly Allstream Centre) is an environmentally friendly conference venue.', '105 Princes\' Blvd', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-263-3000', 0, 'https://www.beanfieldcentre.com/', 'other', -79.410610, 43.634130, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(16, 'Betty Oliphant Theatre (at Canada\'s National ', 'Designed by Jack Diamond, the Betty Oliphant Theatre is used by the Canada National Ballet School as a training and performance venue.', '404 Jarvis St', 'M4Y 2G6', 'Toronto', NULL, 'Canada', '', '416-964-3780', 0, 'https://www.nbs-enb.ca/venue-rentals/betty-oliphant-theatre', 'art', -79.378020, 43.664200, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(17, 'Billy Bishop Toronto City Airport', 'Located minutes from the downtown core, Billy Bishop Airport serves nearby Canadian and American cities.', '2 Eireann Quay', 'M5V 1A1', 'Toronto', NULL, 'Canada', '', '416-203-6942', 0, 'https://www.billybishopairport.com/', 'other', -79.394510, 43.628910, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(18, 'Bluffer\'s Park and Beach (Scarborough Bluffs)', 'Providing a beautiful backdrop for locals and visitors alike, the Bluffs are one of Toronto\'s great natural wonders.', '1 Brimley Rd S', 'M1M 3W3', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/2/index.html', 'nature', -79.234768, 43.708205, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(19, 'BMO Field', 'BMO Field is home to the Toronto FC (Major League Soccer), Canada\'s national soccer team, and the home of the Toronto Argonauts (Canadian Football League).', '170 Princes\' Blvd', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-815-5982', 0, 'https://www.bmofield.com/', 'other', -79.418640, 43.633150, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(20, 'Bubble Planet', 'Bubble Planet is an immersive experience featuring VR technology, illusions, ball pits and more.', '30 Hanover Rd', 'M3K 0E2', 'Toronto', NULL, 'Canada', 'None', 'None', 0, 'https://bubble-planet.com/toronto/', 'other', -79.468310, 43.738080, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(21, 'Buddies in Bad Times Theatre', 'Buddies in Bad Times theatre is the biggest, and the longest-running queer theatre in the world.', '12 Alexander St', 'M4Y 1B4', 'Toronto', NULL, 'Canada', '', '416-975-8555', 0, 'https://buddiesinbadtimes.com/', 'art', -79.383070, 43.663310, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(22, 'Budweiser Stage', 'Located within the Ontario Place grounds, the Budweiser Stage offers concert goers an excellent outdoors venue.', '909 Lake Shore Blvd W', 'M6K 3L3', 'Toronto', NULL, 'Canada', '', '416-260-5600', 0, 'https://www.livenation.com/venue/KovZpZAEkkIA/budweiser-stage-events', 'other', -79.415120, 43.629210, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(23, 'CAA Ed Mirvish Theatre', 'A part of the Toronto theatre scene since 1920, the Ed Mirvish Theatre is a picturesque theatre to view special presentations ranging from concerts, comedy, plays, and many more.', '244 Victoria St', 'M5B 1V8', 'Toronto', NULL, 'Canada', '', '1-800-461-3333', 0, 'https://www.mirvish.com/theatres/ed-mirvish-theatre', 'art', -79.379420, 43.655240, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(24, 'CAA Theatre (formerly Panasonic Theatre)', 'Owned by Mirvish Productions, the CAA Theatre is the home of many famous theatrical productions.', '651 Yonge St', 'M4Y 1Z9', 'Toronto', NULL, 'Canada', '', '1-800-461-3333', 0, 'https://www.mirvish.com/theatres/caa-theatre', 'art', -79.385720, 43.668030, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(25, 'Campbell House', 'The Campbell house dates back to 1822 and was once home to Judge William Campbell.  It is the last example of Palladian architecture in  Toronto.', '160 Queen St W', 'M5H 3H3', 'Toronto', NULL, 'Canada', '', '416-597-0227', 0, 'http://www.campbellhousemuseum.ca/', 'museum', -79.387320, 43.651050, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(26, 'Canada\'s Walk of Fame', 'Canada\'s Walk of Fame celebrates Canadians who have excelled in their respective fields for at least 10 years. The stars are displayed throughout the Entertainment District along King Street West and Simcoe Street.', '215 King St W', 'M5V 1H8', 'Toronto', NULL, 'Canada', '', '416-367-9255', 0, 'https://www.canadaswalkoffame.com/', 'other', -79.386760, 43.647150, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(27, 'Canadian Museum of Cultural Heritage of Indo-', 'The Canadian Museum of Cultural Heritage of Indo-Canadians is a museum committed to the understanding of India\'s rich cultural heritage. See BAPS Shri Swaminarayan Mandir.', '61 Claireville Dr', 'M9W 5Z7', 'Toronto', NULL, 'Canada', '', '416-798-2277', 0, 'https://www.baps.org/cultureandheritage/ExperienceIndia/Exhibitions/CanadianMuseumofCulturalHeritageofIndo-Canadians.aspx', 'museum', -79.626070, 43.738690, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(28, 'Canadian Sculpture Centre', 'The Canadian Scultpture Centre is headquarters to the Sculptors Society of Canada. The society showcases and exibits contemporary Canadian scultpures.', '95 Moatfield Dr', 'M3B 3L6', 'Toronto', NULL, 'Canada', '', '647-435-5858', 0, 'https://www.sculptorssocietyofcanada.org/', 'art', -79.350610, 43.759220, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(29, 'Canadian Stage (Berkeley Street Theatre)', 'Home to the Canadian Stage Company, the Berkeley Street Theatre presents an array of Canadian and international performances.', '26 Berkeley St', 'M5A 2W3', 'Toronto', NULL, 'Canada', '', '416-367-8243', 0, 'https://www.canadianstage.com/Online/default.asp?BOparam::WScontent::loadArticle::permalink=berkeley&BOparam::WScontent::loadArticle::context_id=', 'art', -79.363950, 43.650660, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(30, 'Casa Loma', 'Canadas foremost castle is complete with decorated suites, secret passages, an 800-foot tunnel, towers, stables, and beautiful 5-acre estate gardens.', '1 Austin Ter', 'M5R 1X8', 'Toronto', NULL, 'Canada', '', '416-923-1171', 0, 'https://casaloma.ca/', 'other', -79.409440, 43.678030, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(31, 'Cedar Ridge Creative Centre', 'Situated in a restored mansion, the centre features the Cedar Ridge gallery and rich gardens. The gallery highlights work from artists throughout the Greater Toronto area.', '225 Confederation Dr', 'M1G 1B2', 'Toronto', NULL, 'Canada', '', '416-396-4026', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/cultural-centres-galleries/cedar-ridge-creative-centre/', 'art', -79.207090, 43.757440, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(32, 'Centennial Park', 'Centennial Park is situated in Etobicoke and was opened in 1967 to celebrate Canada\'s 100th birthday. The park features sports fields, a conservatory, a ski hill, an Olympic size swimming pool, picnic areas and a Frisbee golf course.', '256 Centennial Park Rd', 'M9C 5N3', 'Toronto', NULL, 'Canada', '', '416-394-8750', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/798/index.html', 'nature', -79.590150, 43.654840, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(33, 'Centennial Park Conservatory', 'The Centennial Park conservatory is located within Centennial Park. At a size of 12,000 square feet it features an arid house, a show house and a tropical house. The conservatory is open year round and is free to the public.', '151 Elmcrest Rd', 'M9C 3S1', 'Toronto', NULL, 'Canada', '', '416-394-8543', 0, 'https://www.toronto.ca/explore-enjoy/parks-gardens-beaches/gardens-and-horticulture/conservatories/centennial-park-conservatory/', 'nature', -79.588370, 43.649380, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(34, 'Centre Island Beach', 'Centre Island Beach also known as Manitou Beach has been used by locals and tourists alike for more than a century. The beach is located on the south end of Centre Island. It is surrounded by park space and amenities such as bike and boat rentals.', '1 Avenue Of The Islands', '', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'http://app.toronto.ca/tpha/beach/5.html', 'nature', -79.374280, 43.615680, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(35, 'Centreville Amusement Park', 'Centreville is a 14-acre, turn-of-the-century, Ontario village theme park for children located on Centre Island, featuring over 30 rides.', '21 Avenue Of The Islands', '', 'Toronto', NULL, 'Canada', '', '416-203-0405 (Summer) 416-234-2345 (Winter)', 0, 'http://www.centreisland.ca/', 'other', -79.373540, 43.620290, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(36, 'CF Fairview Mall', 'An upscale shopping centre in the north eastern part of Toronto.', '1800 Sheppard Ave E', 'M2J 5A7', 'Toronto', NULL, 'Canada', '', '416-491-0151', 0, 'https://www.cfshops.com/fairview-mall.html', 'other', -79.344710, 43.777930, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(37, 'CF Sherway Gardens', 'An upscale shopping centre in Toronto\'s West end.', '25 The West Mall', 'M9C 1B8', 'Toronto', NULL, 'Canada', '', '416-621-1070', 0, 'https://www.cfshops.com/sherway-gardens.html', 'other', -79.557110, 43.611870, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(38, 'CF Toronto Eaton Centre', 'The Toronto Eaton Centre is downtown Toronto\'s only shopping mall. It features over 200 stores and restaurants as well as the sculpture called Flightstop designed by Michael Snow.', '220 Yonge St', 'M5B 2H1', 'Toronto', NULL, 'Canada', '', '416-598-8560', 0, 'https://www.cfshops.com/toronto-eaton-centre.html', 'other', -79.380720, 43.654380, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(39, 'Cherry Beach/ Clarke Beach Park', 'Cherry Beach is located within the port lands and features a dog\'s off leash area, the Martin Goodman Trail and a picnic site.', '1 Cherry St', 'M5A 0B7', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/209/index.html', 'nature', -79.344090, 43.636850, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(40, 'Chinese Cultural Centre of Greater Toronto', 'The building houses the P.C. Ho theatre, studios, conference rooms, a resource centre, a reception hall and an art gallery.', '5183 Sheppard Ave E', 'M1B 5Z5', 'Toronto', NULL, 'Canada', '', '416-292-9293', 0, 'https://www.cccgt.org/', 'other', -79.234000, 43.794460, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(41, 'CN Tower', 'The CN Tower is an engineering marvel and one of the city\'s most visited sites. It features the world\'s highest wine cellar, a fine dining revolving restaurant (360), a glass floor. For the true adventure seeker, the Edge walk.', '290 Bremner Blvd', 'M5V 3L9', 'Toronto', NULL, 'Canada', '', '416-868-6937', 0, 'http://www.cntower.ca/', 'other', -79.387070, 43.642560, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(42, 'Coca-Cola Coliseum (formerly Ricoh Coliseum)', 'Located at Exhibition Place, the Coca-Cola Coliseum is home to the Toronto Marlies (American Hockey League) and concerts.', '19 Nunavut Rd', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-815-5982', 0, 'https://www.coca-colacoliseum.com/', 'other', -79.415280, 43.634890, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(43, 'Colborne Lodge', 'This quaint cottage located within High Park was home to John and Jemma Howard. In 1873 the couple deeded the part to lodge to the City of Toronto. The house is a great example of a regency style building.', '11 Colborne Lodge Dr', 'M6S 5A3', 'Toronto', NULL, 'Canada', '', '416-392-6916', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/colborne-lodge/', 'museum', -79.459980, 43.640400, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(44, 'Dancemakers Centre for Creation', 'One of Toronto\'s professional contemporary dance companies, Dancemakers and the Centre for Creation is focused on the delivery of refined and passionate dance to its admirers.', '410 Jarvis St', 'M4Y 2G6', 'Toronto', NULL, 'Canada', '', '416-367-1800', 0, 'http://dancemakers.org/', 'art', -79.377920, 43.664510, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(45, 'Design Exchange', 'Canada\'s only museum dedicated to the preservation of design which includes the design heritage from an array of mediums.', '234 Bay St', 'M5K 1B2', 'Toronto', NULL, 'Canada', '', '416-933-2919', 0, 'https://designexchangetoronto.com/', 'museum', -79.380320, 43.647690, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(46, 'Downsview Park', 'The vast green space allows for an array of small-to-large scale events such as culture, dining, leisure, sports, and recreation.', '70 Canuck Ave', 'M3K 2C5', 'Toronto', NULL, 'Canada', '', '416-634-2559', 0, 'https://en.downsviewpark.ca/home', 'nature', -79.484170, 43.743880, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(47, 'Elgin and Winter Garden Theatre Centre', 'The Elgin and Winter Garden Theatre features two completely separate theatres and is the last running double-decker theatre in the world .', '189 Yonge St', 'M5B 1M4', 'Toronto', NULL, 'Canada', '', '416-314-3718', 0, 'https://www.heritagetrust.on.ca/ewg/ewg-home', 'art', -79.379380, 43.653040, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(48, 'Enercare Centre', 'The largest convention centre in Canada, over 180 trade and consumer shows are hosted annually.', '100 Princes\' Blvd', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-263-3000', 0, 'https://www.enercarecentre.com/', 'other', -79.412380, 43.635040, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(49, 'Evergreen Brick Works', 'A former brickyard, the Evergreen Brick Works is an urban model for ecosystem planning. Filled with activities for the whole family and a farmers market.', '550 Bayview Ave', 'M4W 3X8', 'Toronto', NULL, 'Canada', '', '416-596-7670', 0, 'http://www.evergreen.ca/get-involved/evergreen-brick-works/', 'other', -79.364730, 43.684320, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(50, 'Exhibition Place', 'Attracting over 5 million visitors a year, this massive complex features sporting and exhibition facilities, a nightclub and attractions.', '100 Princes\' Blvd', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-263-3000', 0, 'https://www.explace.on.ca/', 'other', -79.412380, 43.635090, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(51, 'Factory Theatre', 'The Factory Theatre operates two theatres in a  Victorian mansion, where they have produced more than 150 Canadian plays, and various workshops.', '125 Bathurst St', 'M5V 2R2', 'Toronto', NULL, 'Canada', '', '416-504-9971', 0, 'https://www.factorytheatre.ca', 'art', -79.402820, 43.645470, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(52, 'Famous People Players', 'Located in Toronto\'s West End, Famous PEOPLE Players allows visitors to immerse themselves in a unique dining experience while enjoying theatre in the dark.', '343 Evans Ave', 'M8Z 1K2', 'Toronto', NULL, 'Canada', '', '416-532-1137', 0, 'https://famouspeopleplayers.com/', 'art', -79.520660, 43.615010, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(53, 'Fort York National Historic Site', 'Birthplace of Toronto in 1793 and scene of the Battle of York in 1813, Fort York has Canadas largest collection of original War of 1812 buildings. Open year round for tours, exhibits, and demonstrations.', '250 Fort York Blvd', 'M5V 3K9', 'Toronto', NULL, 'Canada', '', '416-392-6907', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/fort-york-national-historic-site/', 'museum', -79.404170, 43.639240, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(54, 'Four Seasons Centre for the Performing Arts', 'The Four Seasons Centre for the Performing Arts is home to the Canadian Opera Company and the National Ballet of Canada.', '145 Queen St W', 'M5H 4G1', 'Toronto', NULL, 'Canada', '', '416-363-8231', 0, 'https://www.coc.ca/venue-information/fourseasonscentre', 'art', -79.385680, 43.650520, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(55, 'Franklin Children\'s Garden', 'The garden, inspired by Franklin the Turtle, is an area to discover nature, play, while learning something new.', '30 Centre Island Pk', 'M5J 2E9', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/1806/index.html', 'nature', -79.376270, 43.616150, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(56, 'Gardiner Museum', 'A museum dedicated to one of the oldest forms of art. The Gardiner Museum of Ceramic Art is home to over 3,000 historical and contemporary ceramic pieces.', '111 Queen\'s Park', 'M5S 2C7', 'Toronto', NULL, 'Canada', '', '416-586-8080', 0, 'https://www.gardinermuseum.on.ca/', 'museum', -79.393150, 43.668080, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(57, 'George Ignatieff Theatre', 'In the Trinity College community, the George Ignatieff Theatre acts as a creative hub ranging from events like theatre, conferences, and much more.', '15 Devonshire Pl', 'M5S 2C8', 'Toronto', NULL, 'Canada', '', '416-978-4166', 0, 'https://www.trinity.utoronto.ca/discover/catering-events/george-ignatieff-theatre/', 'art', -79.397150, 43.665570, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(58, 'Gibraltar Point Beach', 'Surrounded by eastern cottonwood trees, the Gibraltar Point Beach is located on the southwest shore of Toronto Island Park. The Gibraltar Point Centre for the Arts is walking distance from the beach.', '443 Lakeshore Ave', 'M5J 2W2', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'http://app.toronto.ca/tpha/beach/4.html', 'nature', -79.384070, 43.612910, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(59, 'Gibson House Museum', 'Operated  by the City of Toronto, the Gibson House is a museum where visitors experience an exquisite farmhouse and learn more about the rural development of the area.', '5172 Yonge St', 'M2N 5P6', 'Toronto', NULL, 'Canada', '', '416-395-7432', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/gibson-house-museum/', 'museum', -79.414900, 43.769620, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(60, 'Glenn Gould Studio', 'Located on the main floor of the Canadian Broadcasting Centre,  the Glenn Gould Studio is a much-celebrated venue for its state of the art recording facilities and acoustics.', '250 Front St W', 'M5V 3G5', 'Toronto', NULL, 'Canada', '', '833-205-5574', 0, 'https://www.cbc.ca/glenngouldstudio/', 'art', -79.387780, 43.644380, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(61, 'Gooderham Flatiron Building', 'Gooderham Building is a historic office building known for its unique location and triangular architecture.', '49 Wellington St E', 'M5E 1C9', 'Toronto', NULL, 'Canada', 'None', '416-392-1975', 0, 'https://www.historicplaces.ca/en/rep-reg/place-lieu.aspx?id=8311', 'other', -79.374170, 43.648440, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(62, 'Graffiti Alley', 'The graffiti hub showcases several blocks of colourful murals and art.', '513 Queen St W', 'M5V 2B4', 'Toronto', NULL, 'Canada', 'None', '416-392-2489', 0, 'https://artwalk.tdwbia.ca/businesses/graffiti-alley-toronto', 'other', -79.398470, 43.647920, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(63, 'Guild Park and Gardens (formely known as Guil', 'A sculptural alluring park and garden, the Guild Park and Gardens is rich in local history and a must-see for locals and visitors alike.', '201 Guildwood Pkwy', 'M1E 1P5', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/406/index.html', 'nature', -79.192490, 43.748090, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(64, 'Hanlan\'s Point Beach', 'Situated on the west shore of Toronto Island Park, this beach is Toronto\'s only clothing optional beach.', '695 Lakeshore Ave', 'M5J 2W2', 'Toronto', NULL, 'Canada', '', '416-392-8196', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/2541/index.html', 'nature', -79.394090, 43.619860, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(65, 'Harbour Square Park', 'Located next to the Toronto Ferry Docks, Harbour Square Park offers downtown folks a spot to sit and watch the ferries travel back and forth to the island.', '25 Queens Quay W', 'M5J 2T5', 'Toronto', NULL, 'Canada', 'None', '416-392-2489', 0, 'https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/parks-and-recreation-facilities/location/?id=74&title=Harbour-Square-Park', 'nature', -79.376650, 43.640190, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(66, 'Harbourfront Centre', 'Popular 10-acre lakeside cultural site offers an eclectic blend of year-round arts, culture and recreation such as concerts, skating, music festivals and dance.', '235 Queens Quay W', 'M5J 2G8', 'Toronto', NULL, 'Canada', '', '416-973-4000', 0, 'http://www.harbourfrontcentre.com/', 'art', -79.381880, 43.638820, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(67, 'Hart House Theatre', 'A point of interest in the University of Toronto community, the Hart House Theatre and it\'s students produce an array of drama, dance, film, and music.', '7 Hart House Cir', 'M5S 3H3', 'Toronto', NULL, 'Canada', '', '416-978-2452', 0, 'https://harthouse.ca/', 'art', -79.394340, 43.664000, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(68, 'High Park', 'High Park is one of Torontos largest parks, and attracts visitors each spring for the blooming of its famous cherry blossoms. It also contains attractions and amenities such as recreational programs, a local zoo, a unique playground and a pond.', '1873 Bloor St W', 'M6R 2Z3', 'Toronto', NULL, 'Canada', '', '416-338-0338', 0, 'http://www.highparktoronto.com/', 'nature', -79.463780, 43.646460, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(69, 'Historic Zion Schoolhouse', 'Built in 1869, the Historic Zion Schoolhouse has been restored to emulate schooling as it once was in the farming  district of L\'Amaroux', '1091 Finch Ave E', 'M2J 2X3', 'Toronto', NULL, 'Canada', '', '416-395-7435', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/zion-schoolhouse/', 'museum', -79.363400, 43.790370, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(70, 'Hockey Hall of Fame', 'Unique to Toronto, and featuring the Stanley Cup, interactive exhibits, shows, and the finest collection of hockey artifacts in the world.', '30 Yonge St', 'M5E 1X8', 'Toronto', NULL, 'Canada', '', '416-360-7765', 0, 'https://www.hhof.com/', 'other', -79.377680, 43.647260, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(71, 'HTO Park', 'Facing the inner harbour with Toronto Island Park in clear viewing,  HTO Park includes an urban beach which is decorated with yellow umbrellas and Muskoka chairs.', '339 Queens Quay W', 'M5V 1A2', 'Toronto', NULL, 'Canada', '', '416-392-8188', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/1663/index.html', 'nature', -79.388170, 43.637790, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(72, 'Hudson\'s Bay', 'Famously known as being North America\'s oldest company, the Hudson Bay is a chain of department stores  that operate throughout the country.', '176 Yonge St', 'M5C 2L7', 'Toronto', NULL, 'Canada', '', '416-861-9111', 0, 'https://www.thebay.com/', 'other', -79.379880, 43.651970, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(73, 'Humber Arboretum', 'Located nearby the West Humber River Valley, the Humber Arboretum offers trails through environmentally-rich areas like forests, and wetlands.', '205 Humber College Blvd', 'M9W 5L7', 'Toronto', NULL, 'Canada', '', '416-675-3111', 0, 'https://humber.ca/arboretum/', 'nature', -79.607490, 43.724810, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(74, 'Humber Bay Park West (Humber Bay Butterfly Ha', 'Located at a waterfront park at the mouth of Mimico Creek, the Humber Bay Butterfly Habitat is focused on providing habitat for an array of native butterfly species.', '100 Humber Bay Park Rd W', 'M8V 3X7', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/1074/index.html', 'nature', -79.477270, 43.624160, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(75, 'iArts Museum', 'This unique museum features larger-than-life 3D illusions as an immersive experience.', '580 King St W', 'M5V 1M1', 'Toronto', NULL, 'Canada', 'None', '416-504-2787', 0, 'https://www.iartsmuseum.ca/', 'museum', -79.399440, 43.644890, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(76, 'Illuminarium Toronto', 'An immerseive experience featuring cutting edge visual, audio and projection technology, occasionally hosting shows.', '28 Gristmill Ln', 'M5A 4R2', 'Toronto', NULL, 'Canada', 'None', '647-368-6070', 0, 'https://www.illuminarium.com/toronto', 'other', -79.360610, 43.649930, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(77, 'Isabel Bader Theatre', 'Located at the University of Toronto, this multi-purpose venue seats 500 patrons whether it be for a lecture, workshop, or a theatrical production.', '93 Charles St W', 'M5S 1K5', 'Toronto', NULL, 'Canada', '', '416-585-4575', 0, 'https://www.vicu.utoronto.ca/hospitality-services/hold-an-event/isabel-bader-theatre/', 'art', -79.392570, 43.667310, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(78, 'Jack Layton Ferry Terminal', 'Located at the foot of Bay Street and Queens Quay West, the  Jack Layton Ferry Terminal acts as a commuting point to and from the Toronto Island Park with frequent ferry service.', '9 Queens Quay W', 'M5J 2H3', 'Toronto', NULL, 'Canada', '', '416-392-8193', 0, 'https://www.toronto.ca/explore-enjoy/parks-gardens-beaches/toronto-island-park/all-ferry-schedules/', 'other', -79.375640, 43.640010, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(79, 'James Garden Park', 'Former estate gardens located in Toronto\'s west end that include rare trees, spring-fed pools, and other seasonal displays.', '99 Edenbridge Dr', 'M9A 4N1', 'Toronto', NULL, 'Canada', '', '416-392-8188', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/3/index.html', 'nature', -79.515460, 43.671110, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(80, 'Kew Gardens Park', 'Located in The Beaches, Kew Gardens act as one of Toronto\'s most popular picnic grounds while having access to the boardwalk on the lakeshore.', '2075 Queen St E', 'M4L 1J1', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/parks-and-recreation-facilities/location/?id=107', 'nature', -79.298490, 43.668160, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(81, 'Koerner Hall (at the Telus Centre for Perform', 'Koerner Hall is a 1,135 seat venue to provide excellent acoustic sounds for all genres of music in its \"shoebox\" designed venue.', '273 Bloor St W', 'M5S 1W2', 'Toronto', NULL, 'Canada', '', '416-408-2824', 0, 'https://www.rcmusic.com/about-us/telus-centre-for-performance-and-learning', 'art', -79.396390, 43.667860, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(82, 'Little Canada', 'This attraction is an immersive joruney through the sights, sounds and wonder of Canada on a miniature scale.', '10 Dundas St E', 'M5B 2G9', 'Toronto', NULL, 'Canada', 'None', '647-578-4663', 0, 'https://little-canada.ca/', 'other', -79.380840, 43.656690, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(83, 'Mackenzie House', 'Mackenzie House is the restored home of William Lyon Mackenzie, Toronto\'s first Mayor. It is one of 10 museums operated by the City of Toronto.', '82 Bond St', 'M5B 1X2', 'Toronto', NULL, 'Canada', '', '416-392-6915', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/mackenzie-house/', 'museum', -79.378410, 43.655670, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(84, 'Marie Curtis Park East Beach', 'Located at the mouth of Etobicoke Creek near the foot of Forty-Second Street. Most users of this beach come from the bordering Long Branch community.', '2 Forty Second St', 'L3P 7K7', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'http://app.toronto.ca/tpha/beach/1.html', 'nature', -79.540540, 43.585720, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(85, 'Massey Hall', 'Declared a heritage building in  the 1970s, this live events venue acts as a performance venue for various artists.', '178 Victoria St', 'M5B 1T7', 'Toronto', NULL, 'Canada', '', '416-872-4255', 0, 'https://www.masseyhall.com/', 'art', -79.378980, 43.654010, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(86, 'Mattamy Athletic Centre', 'Mattamy Athletic Centre is located within Maple Leafs Garden and is home to the Ryerson Ram\'s basketball, hockey and volleyball teams.', '50 Carlton St', 'M5B 1J2', 'Toronto', NULL, 'Canada', '', '416-598-5960', 0, 'https://www.mattamyathleticcentre.ca/', 'other', -79.380340, 43.662170, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(87, 'Medieval Times Dinner and Tournament', 'A family dinner theatre featuring staged medieval-style games, sword-fighting, and jousting performed by a cast of actors and horses.', '10 Dufferin St', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-260-1170', 0, 'https://www.medievaltimes.com/', 'art', -79.425530, 43.632630, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(88, 'Mel Lastman Square', 'A public park featuring 20,000 square feet of open space, a garden court, an outdoor amphitheatre, fountains and a reflecting pool.', '5100 Yonge St', 'M2N 5V7', 'Toronto', NULL, 'Canada', 'None', '416-395-7584', 0, 'https://mlsquare.ca/', 'other', -79.414160, 43.767520, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(89, 'Meridian Arts Centre (formerly Toronto Centre', 'This venue features three unique stages to house a multitude of concerts, shows and events.', '5040 Yonge St', 'M2N 6R8', 'Toronto', NULL, 'Canada', '', '416-733-9388', 0, 'http://www.meridianartscentre.com/', 'art', -79.414120, 43.766460, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(90, 'Meridian Hall (formerly Sony Centre for the P', 'Meridian Hall is a performing arts venue with a range of events that include concerts, dance, and much more.', '1 Front St E', 'M5E 1B2', 'Toronto', NULL, 'Canada', '', '416-368-6161', 0, 'http://www.meridianhall.com/', 'art', -79.376080, 43.646680, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(91, 'Metro Toronto Convention Centre', 'Offers more than 600,000 square feet of large exhibit, event, and meeting space.', '255 Front St W', 'M5V 2W6', 'Toronto', NULL, 'Canada', '', '416-585-8000', 0, 'https://www.mtccc.com/', 'other', -79.386720, 43.643810, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(92, 'Montgomery\'s Inn', 'A museum that was once a historic home, visitors can delve into the lifestyle of a 19th century Irish farm family with access to the bedrooms, kitchen wing and much more.', '4709 Dundas St W', 'M9A 1A8', 'Toronto', NULL, 'Canada', '', '416-394-8113', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/montgomerys-inn/', 'museum', -79.525700, 43.651710, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(93, 'Museum of Contemporary Canadian Art', 'A variety of original and thought-provoking exhibitions, promoting innovative art by Canadian and international artists. Over 800 artists have been featured in more than 80 exhibitions and projects.', '158 Sterling Rd', 'M6R 2B7', 'Toronto', NULL, 'Canada', '', '416-530-2500', 0, 'https://moca.ca/', 'art', -79.445210, 43.654600, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(94, 'Museum of Illusions Toronto', 'The Museum of Illusions offers a wide array of mind-bending exhibits and optical illusions.', '132 Front St E', 'M5A 1E2', 'Toronto', NULL, 'Canada', 'None', '416-889-2285', 0, 'https://museumofillusions.ca/', 'museum', -79.369630, 43.650110, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(95, 'Mysteriously Yours Mystery Dinner Theatre', 'Mysteriously Yours. Mystery Dinner Theatre is a murder mystery dinner theatre located in  Downtown Toronto.', '33 Gerrard St W', 'M5G 1Z4', 'Toronto', NULL, 'Canada', '', '647-361-5114', 0, 'https://mysteriouslyyours.ca/', 'art', -79.383060, 43.658350, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(96, 'Native Earth Performing Arts & Aki Studio', 'Native Earth Performing Arts is a theatre company devoted to the artistic expression of the Indigenous experience. Located in Daniels Spectrum.', '585 Dundas St E', 'M5A 2B7', 'Toronto', NULL, 'Canada', '', '416-531-1402', 0, 'https://www.nativeearth.ca/', 'art', -79.362070, 43.660060, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(97, 'Old City Hall', 'Old City Hall is a landmark building that was used as Toronto\'s second City Hall and is a great example of beautiful architecture. Today, it is used as a courthouse.', '60 Queen St W', 'M5H 2M3', 'Toronto', NULL, 'Canada', '', '416-338-0338', 0, 'https://www.toronto.ca/311/knowledgebase/kb/docs/articles/Corporate-Real-Estate-Management/facilities-management/old-city-hall-toronto-courthouse.html', 'other', -79.381710, 43.652510, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(98, 'Onsite Gallery [at] OCADU', 'Onsite [at] OCAD U provides the opportunity and space of an art gallery to exhibit students contemporary work.', '199 Richmond St W', 'M5V 0H4', 'Toronto', NULL, 'Canada', '', '416-977-6000', 0, 'https://www.ocadu.ca/gallery/onsite', 'art', -79.388070, 43.649500, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(99, 'Osgoode Hall', 'Constructed in the 19th century, Osgoode Hall acts as the judicial landmark of Toronto, with institutions like the Ontario Court of Appeal, the Law Society of Upper Canada, and the Divisional Court of the Superior Court of Justice.', '130 Queen St W', 'M5H 2N6', 'Toronto', NULL, 'Canada', '', '416-947-3300', 0, 'https://www.osgoode.yorku.ca/', 'other', -79.385780, 43.652020, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(100, 'Polson Pier', 'Located on the water, the Polson Pier is a waterfront property that includes a drive-in cinema, patio bar, concert venues, and much more.', '11 Polson St', 'M5A 1A4', 'Toronto', NULL, 'Canada', '', 'None', 0, 'https://g.co/kgs/rY8Pkrh', 'other', -79.355590, 43.641020, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(101, 'Princess of Wales Theatre', 'Owned by Mirvish Productions. The Princess of Wales Theatre opened in 1993 and is the home  of many famous theatrical productions', '300 King St W', 'M5V 1J2', 'Toronto', NULL, 'Canada', '', '1-800-461-3333', 0, 'https://www.mirvish.com/theatres/princess-of-wales-theatre', 'art', -79.389190, 43.646890, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(102, 'Queen Elizabeth Theatre', 'Located at Exhibition Place, the Queen Elizabeth Theatre is an auditorium that is the venue for various entertainment events', '190 Princes\' Blvd', 'M6K 3C3', 'Toronto', NULL, 'Canada', '', '416-263-3293', 0, 'https://queenelizabeththeatre.ca/', 'art', -79.421370, 43.632710, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(103, 'Queen\'s Park: Legislative Assembly of Ontario', 'A variety of free tour options are available all year round to visit Ontarios historic Legislative Building (iconic sandstone Richardson Romanesque style building, completed in 1893).', '1 Queen\'s Park', 'M7A 1A2', 'Toronto', NULL, 'Canada', '', '416-325-7500', 0, 'https://www.ola.org/en/visit-learn/parliament-government/explore-queens-park', 'other', -79.391590, 43.662230, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(104, 'Randolph Centre for the Arts', 'The historic Randolph Theatre is a 500-seat theatre located in a former Gothic revival style church.', '736 Bathurst St', 'M5S 2R4', 'Toronto', NULL, 'Canada', '', '416-924-2243', 0, 'https://www.randolphcollege.ca/', 'art', -79.410850, 43.663650, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(105, 'Redpath Sugar Museum', 'Located inside the Redpath Refinery, the Redpath Sugar Museum is for those interested in the history of sugar, the development and the role of the Redpath family in Canada\'s industry sector, and much more.', '95 Queens Quay E', 'M5E 1A3', 'Toronto', NULL, 'Canada', '', '416-366-3561', 0, 'https://www.redpathsugar.com/', 'museum', -79.371240, 43.642910, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(106, 'Ripley\'s Aquarium of Canada', 'Canadas largest aquarium. Interactive attractions feature over 5.7 million litres of water and more than 16,000 marine animals.', '288 Bremner Blvd', 'M5V 3L9', 'Toronto', NULL, 'Canada', '', '647-351-3474', 0, 'https://www.ripleyaquariums.com/canada/', 'other', -79.386610, 43.642170, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(107, 'Riverdale Farm', 'On 7.5 acres, Riverdale Farm is an historic working farm with many scenic pathways and farm animals.', '201 Winchester St', 'M4X 1B8', 'Toronto', NULL, 'Canada', '', '416-392-6794', 0, 'http://riverdalefarmtoronto.ca/', 'other', -79.361730, 43.666970, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(108, 'Riverdale Park (East and West)', 'A Toronto park that is great for all seasons. Riverdale Park West has three multipurpose sport fields, seven tennis courts, an outdoor ice rink, two baseball diamonds, and much more.', '550 Broadview Ave', 'M4K 2N6', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/343/index.html', 'nature', -79.356370, 43.668400, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(109, 'Rogers Centre', 'The Rogers Centre is a multipurpose venue. Home to the Toronto Blue Jays (Major League Baseball) and the Toronto Argonauts (Canadian Football League).', '1 Blue Jays Way', 'M5V 1J4', 'Toronto', NULL, 'Canada', '', '416-341-1000', 0, 'https://www.mlb.com/bluejays/ballpark', 'other', -79.389430, 43.641550, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(110, 'Rosetta McClain Gardens', 'The Rosetta McClain Gardens is a great place to safely see the Scarborough Bluffs and has beautiful rose gardens. There are signs available in braille, textured paths, raised planters, and a ramp to ensure accessibility.', '5 Glen Everest Rd', 'M1N 1J2', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'www.toronto.ca/data/parks/prd/facilities/complex/19/index.html', 'nature', -79.255760, 43.696820, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(111, 'Rouge Beach Park', 'One of Toronto\'s designated swimming beaches, Rouge Beach has two distinct areas a white sand beach and a marsh habitat.', '195 Rouge Hills Dr', 'M1C 2Y9', 'Toronto', NULL, 'Canada', '', '416-264-2020', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/340/index.html', 'nature', -79.118530, 43.793140, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(112, 'Rouge National Urban Park', 'Canada\'s first national park within an urban area, the park is Toronto\'s largest. It features hiking trails, a campground and Rouge Beach.', '25 Zoo Rd', 'M1B 5W8', 'Toronto', NULL, 'Canada', '', '416-264-2020', 0, 'https://www.pc.gc.ca/en/pn-np/on/rouge', 'nature', -79.172770, 43.817930, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(113, 'Rouge Valley Conservation Centre', 'The Centre focuses on environmental restoration and research while also offering interpretive walks and educational programs for the public.', '1749 Meadowvale Rd', 'M1B 5W8', 'Toronto', NULL, 'Canada', 'None', '416-282-8265', 0, 'https://www.rvcc.ca/Rouge_Valley_Conservation_Centre.html', 'nature', -79.171010, 43.819040, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(114, 'Roy Thomson Hall', 'Opened in 1982, Roy Thomson Hall is home of the Toronto Symphony Orchestra and the Toronto Mendelssohn Choir.', '60 Simcoe St', 'M5J 2H5', 'Toronto', NULL, 'Canada', '', '416-872-4255', 0, 'https://www.roythomsonhall.com/', 'art', -79.386410, 43.646610, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(115, 'Royal Alexandra Theatre', 'Owned by Mirvish Productions. The Royal Alexandra Theatre built in beaux-arts architectural style in 1907. It is home to numerous performances and performers.', '260 King St W', 'M5V 1H9', 'Toronto', NULL, 'Canada', '', '1-800-461-3333', 0, 'https://www.mirvish.com/theatres/royal-alexandra-theatre', 'art', -79.387580, 43.647330, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(116, 'Royal Conservatory of Music', 'The Toronto Conservatory of Music was founded in 1886.', '273 Bloor St W', 'M5S 1W2', 'Toronto', NULL, 'Canada', '', '416-408-2824', 0, 'https://www.rcmusic.com/', 'art', -79.396310, 43.667960, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(117, 'Royal Ontario Museum', 'Canadas largest museum of natural history and world cultures, presents engaging galleries of art, archaeology, and natural science from around the world.', '100 Queen\'s Park', 'M5S 2C6', 'Toronto', NULL, 'Canada', '', '416-586-8000', 0, 'https://www.rom.on.ca/en', 'museum', -79.394790, 43.667710, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(118, 'Sankofa Square (formerly known as Yonge-Dunda', 'Yonge-Dundas Square is one of the city\'s largest public squares. It is located directly across from the Toronto Eaton Centre. The square is home to free movie screenings, concerts, shows and exhibits.', '1 Dundas St E', 'M5B 2L6', 'Toronto', NULL, 'Canada', '', '416-979-9960', 0, 'https://www.sankofasquare.ca/', 'other', -79.380430, 43.655930, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(119, 'Sarah and Chaim Neuberger Holocaust Education', 'The Sarah and Chaim Neuberger Holocaust Education Centre provides all its visitors a complete understanding of the Holocaust.30, 000 students pass through its doors during educational trips.', '4588 Bathurst St', 'M2R 1W6', 'Toronto', NULL, 'Canada', '', '416-631-5689', 0, 'https://www.holocaustcentre.com/', 'museum', -79.441860, 43.764110, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(120, 'Scarborough Museum', 'The Scarborough Museum and its gardens are located within Thomson Memorial Park.It is one of 10 museums operated by the City of Toronto.The Museum looks back on the story of Scarborough\'s roots and history.', '1007 Brimley Rd', 'M1P 3E8', 'Toronto', NULL, 'Canada', '', '416-338-8807', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/scarborough-museum/', 'museum', -79.254820, 43.757610, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(121, 'Scarborough Village Theatre', 'Theatre Scarborough is an umbrella organization consisting of Scarborough Music Theatre, Scarborough Players, and Scarborough Theatre Guild. Performances take place at the Scarborough Village Community Centre.', '3600 Kingston Rd', 'M1M 1R9', 'Toronto', NULL, 'Canada', '', '416-267-9292', 0, 'https://theatrescarborough.com/', 'art', -79.216920, 43.739830, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(122, 'Scotiabank Arena', 'The Scotiabank Arena is a multi-purpose indoor sporting arena and concert venue. It is the home of the Toronto Maple Leafs Hockey Club, the Toronto Raptors basketball team, and the Toronto Rock Lacrosse team.', '40 Bay St', 'M5J 2X2', 'Toronto', NULL, 'Canada', '', '416-815-5982', 0, 'https://www.scotiabankarena.com/', 'other', -79.379100, 43.643460, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(123, 'Soulpepper Theatre Company', 'Soulpepper is a not-for-profit theatre company that offers plays and concerts with a focus on training and youth projects.', '50 Tank House Lane', 'M5A 3C4', 'Toronto', NULL, 'Canada', 'None', '416-866-8666', 0, 'https://www.soulpepper.ca/', 'art', -79.352772, 43.650840, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(124, 'Spadina Museum', 'Operated by the City of Toronto, the Spadina Museum is a historic manor house that allows visitors to learn about the history and architecture of  late 19th century to early 20th century Toronto.', '285 Spadina Rd', 'M5R 2V5', 'Toronto', NULL, 'Canada', '', '416-392-6910', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/spadina-museum/', 'museum', -79.408180, 43.678980, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(125, 'St. James Park', 'A large green space, home to a Victorian garden, live performances, and is a popular spot for photos. The park is adjacent to historic St. James Cathedral.', '120 King St E', 'M5C 1G6', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/408/index.html', 'nature', -79.373060, 43.650830, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(126, 'St. Lawrence Centre for the Arts', 'Home to  two theatres, the Bluma Appel Theatre and the Jane Mallett Theatre, the St. Lawrence Centre for the Arts is the home to various artistic and public events.', '27 Front St E', 'M5E 1B4', 'Toronto', NULL, 'Canada', '', '416-366-1656', 0, 'https://tolive.com/Home-Page', 'art', -79.375310, 43.647530, '2025-06-12 16:34:48', '2025-06-12 16:34:48');
INSERT INTO `attraction` (`attraction_id`, `name`, `description`, `address`, `postal_code`, `city`, `province`, `country`, `email`, `phone`, `is_close`, `website`, `category`, `longitude`, `latitude`, `created_at`, `updated_at`) VALUES
(127, 'St. Lawrence Market and Market Gallery', 'Voted best fresh food market in the world by National Geographic in 2012, Torontos historic and premier market also includes The Market Gallery, housed within part of Torontos original 19th century City Hall.', '93 Front St E', 'M5E 1C3', 'Toronto', NULL, 'Canada', '', '416-392-7220', 0, 'http://www.stlawrencemarket.com/', 'other', -79.371560, 43.648700, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(128, 'Steam Whistle Brewery', 'A microbrewery located in downtown Toronto, Steam Whistle Brewery produces a premium pale lager composed of only four ingredients.', '255 Bremner Blvd', 'M5V 3M9', 'Toronto', NULL, 'Canada', '', '416-362-2337', 0, 'https://steamwhistle.ca/', 'other', -79.385700, 43.640670, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(129, 'Sugar Beach Park', 'Sugar Beach is one of Toronto\'s urban beach parks. Famous for its pink umbrellas and Muskoka chairs.', '11 Dockside Dr', 'M5A 0B6', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/2261/index.html', 'nature', -79.367430, 43.642900, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(130, 'Sunnyside Beach', 'One of Toronto\'s designated swimming beaches, Sunnyside Beach provides rowers and paddlers calm waters with an offshore break wall.', '1755 Lake Shore Blvd W', 'M6S 5A3', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/394/index.html', 'nature', -79.457030, 43.637380, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(131, 'Taras H. Shevchenko Museum', 'The Taras H. Shevchenko Museum is the home to  exhibitions dedicated to the contribution of Ukrainians in Canada and the life of famed writer Taras Shevchenko.', '1604 Bloor St W', 'M6P 1A7', 'Toronto', NULL, 'Canada', '', '416-534-8662', 0, 'https://www.shevchenko.ca/', 'museum', -79.455240, 43.655990, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(132, 'Tarragon Theatre', 'The Tarragon Theatre is a performing arts centre  notable for the development of playwrights. Over 170 works have premiered at the theatre.', '30 Bridgman Ave', 'M5R 1X3', 'Toronto', NULL, 'Canada', '', '416-531-1827', 0, 'https://tarragontheatre.com/', 'art', -79.412870, 43.674940, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(133, 'Textile Museum of Canada', 'With more than 13,000 objects from more than 200 countries and regions, the Textile Museum of Canada celebrates cultural diversity through traditional fabrics, garments, carpets and related artifacts such as beadwork and basketry.', '55 Centre Ave', 'M5G 2H5', 'Toronto', NULL, 'Canada', '', '416-599-5321', 0, 'https://textilemuseum.ca/', 'museum', -79.386740, 43.654470, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(134, 'The 48th Highlanders Museum', 'This museum is dedicated to one of Canada\'s famous military regiments. The museum holds historical artifacts dating from Victorian Toronto in 1891, when the 48th Highlanders was formed, to the present day.', '73 Simcoe St', 'M5J 1W9', 'Toronto', NULL, 'Canada', '', '416-596-1382', 0, 'https://museum.48thhighlanders.ca/', 'museum', -79.385710, 43.647350, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(135, 'The Danforth Music Hall', 'The Music Hall boasts new theatre seats, state-of-art sound and lighting and a completely renovated backstage area.', '147 Danforth Ave', 'M4K 1N2', 'Toronto', NULL, 'Canada', '', '416-778-8163', 0, 'http://thedanforth.com/', 'art', -79.357000, 43.676230, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(136, 'The Distillery Historic District', 'A pedestrian-only historic area that represents the largest and best preserved collection of Victorian Industrial Architecture in North America. The refurbished warehouses are now home to restaurants, bars, galleries, studios, and a theatre.', '55 Mill St', 'M5A 3C4', 'Toronto', NULL, 'Canada', '', '647-693-4646', 0, 'https://www.thedistillerydistrict.com/', 'other', -79.359150, 43.650240, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(137, 'The Image Centre (formerly known as Ryerson I', 'The RIC is dedicated to the public exhibition, research, study and teaching of photography including, installation art and film and media.', '33 Gould St', 'M5B 1E9', 'Toronto', NULL, 'Canada', '', '416-979-5164', 0, 'https://theimagecentre.ca/', 'art', -79.379380, 43.657690, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(138, 'The Japan Foundation', 'A cultural establishment aiming towards effective development of its international cultural exchange programs in Japanese arts and cultural exchange.', '2 Bloor St E', 'M4W 1A8', 'Toronto', NULL, 'Canada', '', '416-966-1600', 0, 'https://tr.jpf.go.jp/', 'museum', -79.386510, 43.670800, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(139, 'The Power Plant Contemporary Art Gallery', 'Dedicated to contemporary art, the Power Plant is a free public gallery located at the Harbourfront Centre.', '231 Queens Quay W', 'M5J 2G8', 'Toronto', NULL, 'Canada', '', '416-973-4949', 0, 'http://www.thepowerplant.org/', 'art', -79.381870, 43.638470, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(140, 'The Second City', 'Second City produces premiere comedy performances and operates a training centre.', '1 York St', 'M5J 0B6', 'Toronto', NULL, 'Canada', '', '1-800-896-8120', 0, 'https://www.secondcity.com/toronto/', 'art', -79.380370, 43.641570, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(141, 'The Theatre Centre', 'The Theatre Centre supports artists who wish to develop works of an experimental or alternative nature. All their artists embrace the visual arts, music, dance and new media.', '1115 Queen St W', 'M6J 1J1', 'Toronto', NULL, 'Canada', '', '416-538-0988', 0, 'http://theatrecentre.org/', 'art', -79.423270, 43.643000, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(142, 'The Village Players', 'The Village Playhouse a non-profit theatre group that opened its doors in 1974 and has since produced plays such as Cat on a Hot Tin Roof, Amadeus and Dial \'M\' For Murder.', '2190 Bloor St W', 'M6S 1N3', 'Toronto', NULL, 'Canada', '', '416-767-7702', 0, 'http://www.villageplayers.net/', 'art', -79.474760, 43.651710, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(143, 'The Well', 'The Well opened in 2023, offering diverse dining experiences, retail stores and unique architecture.', '486 Front St W', 'M5V 0V2', 'Toronto', NULL, 'Canada', 'None', '416-203-7777', 0, 'https://thewelltoronto.com/', 'other', -79.395790, 43.642790, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(144, 'Theatre Passe Muraille', 'Theatre Passe Muraille was Canadas original alternative theatre company. 600 Canadian plays have been produced since the company was founded in 1968.', '16 Ryerson Ave', 'M5T 2P3', 'Toronto', NULL, 'Canada', '', '416-504-7529', 0, 'http://passemuraille.ca/', 'art', -79.402500, 43.648560, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(145, 'Thompson Landry Gallery - Stone Building & Co', 'The Thompson Landry Gallery is spread out over 6,000 square feet and showcases artwork from internationally acclaimed contemporary Quebec artists. The gallery opened in 2009 and is situated within the Distillery District\'s Cooperage Building.', '32 Distillery Lane', 'M5A 3C4', 'Toronto', NULL, 'Canada', '', '416-364-4955', 0, 'http://www.thompsonlandry.com/', 'art', -79.360190, 43.649740, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(146, 'TIFF Bell Lightbox', 'The TIFF Bell Lightbox is the home of the Toronto International Film Festival and a year-round destination for unique screenings, themed festivals, and exhibitions. It also houses two restaurants.', '350 King St W', 'M5V 3X5', 'Toronto', NULL, 'Canada', '', '416-599-2033', 0, 'https://www.tiff.net/', 'other', -79.390500, 43.646540, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(147, 'Todmorden Mills Heritage Site', 'Todmorden Mills Heritage Site is situated within the Don Valley and is located beside a 9.2 hectare wildflower preserve. It features historic buildings such as the Brewery building and the Papermill theatre and gallery.', '67 Pottery Rd', 'M4K 2B9', 'Toronto', NULL, 'Canada', '', '416-396-2819', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/museums/todmorden-mills/', 'other', -79.360240, 43.686470, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(148, 'Tommy Thompson Park', 'This narrow peninsula park is a perfect place for hiking, jogging, cycling and birdwatching, with 10km of paved trails.', '1 Leslie St', 'M4M 3M2', 'Toronto', NULL, 'Canada', '', '416-661-6600', 0, 'https://tommythompsonpark.ca/', 'nature', -79.324870, 43.635190, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(149, 'Toronto Botanical Gardens and Edwards Gardens', 'Located at the stunning Edwards Gardens, Toronto Botanical Garden features award-winning themed gardens and an indoor education/interpretation facility.', '777 Lawrence Ave E', 'M3C 1P2', 'Toronto', NULL, 'Canada', '', '416-397-1341', 0, 'https://torontobotanicalgarden.ca/', 'nature', -79.358170, 43.734150, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(150, 'Toronto City Hall and Nathan Phillips Square', 'Toronto\'s City Hall is one of Toronto\'s best known and visited landmarks. Nathan Phillips Square located directly in front of City Hall, is the site of  the iconic Toronto sign, concerts, farmers\' markets, and iconic events.', '100 Queen St W', 'M5H 2N1', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/services-payments/venues-facilities-bookings/booking-city-facilities/city-hall/', 'other', -79.383690, 43.653030, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(151, 'Toronto Congress Centre', 'The Toronto Congress Centre opened in 1995 and now features over 1 million square feet of space for galas, meetings, trade shows and conventions,', '650 Dixon Rd', 'M9W 1J1', 'Toronto', NULL, 'Canada', '', '416-245-5000', 0, 'https://www.torontocongresscentre.com/', 'other', -79.578340, 43.692380, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(152, 'Toronto Island Park', 'The Toronto Island Park is North America\'s largest car free neighbourhood and is only a short ferry ride away from downtown Toronto. The park is features several attractions, beaches, restaurants, bike and boat rentals and plenty of open green space.', '1 Centre Island Pk', '', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://www.toronto.ca/explore-enjoy/parks-gardens-beaches/toronto-island-park/', 'nature', -79.374690, 43.622560, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(153, 'Toronto Metropolitan University Theatre (form', 'Ryerson Theatre is home to various productions which includes concerts, film presentations, and Ryerson Theatre and Fashion Schools productions.', '43 Gerrard St E', 'M5G 2A7', 'Toronto', NULL, 'Canada', '', '416-979-5009', 0, 'https://www.torontomu.ca/performance/', 'art', -79.379930, 43.659290, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(154, 'Toronto Music Garden', 'The Toronto Music Garden is situated on Toronto\'s newly revamped waterfront. The garden was designed by landscape designer Julie Moir Messervy and by the cellist Yo Yo Ma.', '479 Queens Quay W', 'M5V 3M8', 'Toronto', NULL, 'Canada', '', '416-973-4000', 0, 'https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/parks-and-recreation-facilities/location/?id=1707&title=Toronto-Music-Garden', 'nature', -79.394300, 43.636940, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(155, 'Toronto Pearson International Airport', 'Canadas busiest airport with flights to over 180 destinations around the globe.', '6301 Silver Dart Dr', 'L5P 1B2', 'Mississauga', NULL, 'Canada', '', '416-247-7678', 0, 'https://www.torontopearson.com/en', 'other', -79.628500, 43.679830, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(156, 'Toronto Police Museum & Discovery Centre', 'The Toronto Police Museum & Discovery Centre occupies 3,000 square feet within the Police Headquarters building on College Street. The museum solely relies on private donations and is a not for profit registered charity.', '40 College St', 'M5G 2J3', 'Toronto', NULL, 'Canada', '', '416-808-7020', 0, 'https://www.tps.ca/museum/', 'museum', -79.384820, 43.661220, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(157, 'Toronto Railway Museum', 'The Toronto Railway Museum encompasses the Canadian Pacific Railway John Street Roundhouse at Roundhouse Park and features a restored turntable, a number of trains and the 1896 Canadian Pacific Don Station.', '255 Bremner Blvd', 'M5V 3M9', 'Toronto', NULL, 'Canada', '', '416- 214-9229', 0, 'https://torontorailwaymuseum.com/', 'museum', -79.385950, 43.640710, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(158, 'Toronto Reference Library', 'The Toronto Reference Library is situated in a 5 storey building within the Yorkville neighbourhood. It is the largest public reference library in Canada.', '789 Yonge St', 'M4W 2G8', 'Toronto', NULL, 'Canada', '', '416-395-5577', 0, 'https://www.torontopubliclibrary.ca/torontoreferencelibrary/', 'other', -79.386820, 43.671790, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(159, 'Toronto Sculpture Garden', 'Since 1981 this small urban park has featured contemporary sculpture installations by various artists.', '115 King St E', 'M5C 1G6', 'Toronto', NULL, 'Canada', '', '647-458-5657', 0, 'https://www.toronto.ca/explore-enjoy/history-art-culture/public-art/public-art-monuments-collection/comp-sculpture-garden/', 'nature', -79.373660, 43.649840, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(160, 'Toronto Tourist Information Centre', 'The Toronto Tourist Information Centre provides travel advice and information to all its customers. Services include free Wi-Fi service, brochures and souvenirs. Located at the entrance to the Skywalk.', '65 Front St W', 'M5J 1E6', 'Toronto', NULL, 'Canada', '', '416-392-9300', 0, 'https://www.toronto.ca/explore-enjoy/visitor-services/tourist-information-centres/', '', -79.381780, 43.644820, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(161, 'Toronto Zoo', 'The Toronto Zoo is one of the largest zoos in the world at 287 hectares (710 acres) and is known for interactive education and conservation activities. It is currently home to 2 giant pandas, and more than 5,000 animals representing over 500 species.', '2000 Meadowvale Rd', 'M1B 5W8', 'Toronto', NULL, 'Canada', '', '416-392-5900', 0, 'https://www.torontozoo.com/', 'other', -79.182290, 43.820340, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(162, 'Toronto\'s First Post Office', 'Toronto\'s First Post Office acts as a museum but also continues to operate as a full service Canada Post office. Admission to the museum is by donation.', '260 Adelaide St E', 'M5A 1N1', 'Toronto', NULL, 'Canada', '', '416-865-1833', 0, 'http://www.townofyork.com/', 'museum', -79.370400, 43.651900, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(163, 'Travellers\' Aid Society of Toronto', 'Travellers\' Aid Society of Toronto operates two desks; one at Pearson International Airport and the other within Union Station\'s grand hall. They offer free services to the general travelling public.', '65 Front St W', 'M5J 1E6', 'Toronto', NULL, 'Canada', '', '416-366-7788', 0, 'https://www.travelersaid.org/blog/tai-members/travellers-aid-toronto/', '', -79.380610, 43.645220, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(164, 'Trinity Square', 'Located in between the Toronto Eaton Centre and Old City Hall, the park features a fountain, ornamental pond, a labryrinth and seating; the park is a hotspot for music and events.', '19 Trinity Sq', 'M5G 1B1', 'Toronto', NULL, 'Canada', 'None', '416-392-2489', 0, 'https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/parks-and-recreation-facilities/location/?id=238', 'other', -79.381620, 43.654700, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(165, 'Ukrainian Museum of Canada', 'The Ukrainian Museum of Canada features over 4,000 artifacts. These artifacts include prints, coins, maps jewellery, textiles and historic costumes.', '620 Spadina Ave', 'M5S 2H4', 'Toronto', NULL, 'Canada', '', '416-923-9861', 0, 'http://umcontario.com/', 'museum', -79.402100, 43.661980, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(166, 'Union Station', 'Union Station is the busiest transportation hub in all of Canada. It serves more than 250,000 passengers daily. Via Rail, the TTC, Go Transit and Amtrak all operate out of the station', '65 Front St W', 'M5J 1E6', 'Toronto', NULL, 'Canada', '', '416-392-2489', 0, 'https://torontounion.ca/', 'other', -79.380420, 43.645320, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(167, 'Union Station Bus Terminal', 'The bus terminal is the intercity transportation hub in Toronto.', '81 Bay St', 'M5E 1Z8', 'Toronto', NULL, 'Canada', '', '416-874-5900', 0, 'https://www.gotransit.com/en/find-a-station/un/un-new-union-station-bus-terminal-usbt-at-cibc-square', 'other', -79.377520, 43.644010, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(168, 'Village at Black Creek (Black Creek Pioneer V', 'Become immersed in the lifestyles, customs, and surroundings of early residents who built the foundations for modern Toronto and Ontario at this 30-acre site.', '1000 Murray Ross Pkwy', 'M3J 2P3', 'Toronto', NULL, 'Canada', '', '416-736-1733', 0, 'https://blackcreek.ca/', 'museum', -79.515070, 43.772600, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(169, 'Village of Yorkville Park', 'The Village of Yorkville Park was built on the site of a former parking lot, in the heart of the Bloor Yorkville neighbourhood. The main focal point of the park is the rock which weighs 650 tonnes and is approximately 1 billion years old.', '115 Cumberland St', 'M5R 1A6', 'Toronto', NULL, 'Canada', '', '416-338-4386', 0, 'https://www.bloor-yorkville.com/village-yorkville-park-green-space-gem/', 'nature', -79.391680, 43.670020, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(170, 'Ward\'s Island Beach', 'Ward\'s Island beach is located on the most Eastern part of the Toronto Islands. It features a residential neighbourhood, 2 restaurants, a beach and boardwalk.', '40 Lakeshore Ave', 'M5J 1X8', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'http://app.toronto.ca/tpha/beach/6.html', 'nature', -79.352240, 43.630020, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(171, 'Winchester Street Theatre', 'The Winchester Street Theatre is owned and jointly operated by the Toronto Dance Theatre and the School of Toronto Dance Theatre. The venue features rake seating and a stage that best showcases dance performances.', '80 Winchester St', 'M4X 1B2', 'Toronto', NULL, 'Canada', '', 'None', 0, 'https://ttdf.ca/', 'art', -79.367110, 43.666350, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(172, 'Woodbine Beach', 'Woodbine Beach is one of the city\'s main beaches. The park is located over 15.2 hectares.  Features include the Martin Goodman Trail and the Donald D. Summerville Outdoor Olympic Pool.', '1675 Lake Shore Blvd E', 'M4L 3W6', 'Toronto', NULL, 'Canada', '', '416-396-7378', 0, 'https://www.toronto.ca/data/parks/prd/facilities/complex/311/index.html', 'nature', -79.307090, 43.661810, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(173, 'Woodbine Racetracks', 'Offers both Standardbred and Thoroughbred racing and hosts many prominent events (including the Queens Plate)throughout the year.', '555 Rexdale Blvd', 'M9W 7G3', 'Toronto', NULL, 'Canada', '', '416-675-7223', 0, 'https://woodbine.com/', 'other', -79.604120, 43.714460, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(174, 'Woodbine Shopping Centre and Fantasy Fair', 'The Woodbine Shopping Centre is located in the north western part of the city; close to Pearson Airport and Woodbine Racetrack. Fantasy Fair located within the mall is an indoor amusement park for children.  In 2015 it celebrates 30 years.', '500 Rexdale Blvd', 'M9W 6K5', 'Toronto', NULL, 'Canada', '', '437-880-8448', 0, 'http://www.fantasyfair.ca/', 'other', -79.600030, 43.720670, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(175, 'Yorkdale Shopping Centre', 'An upscale shopping centre in the northern part of Toronto.', '3401 Dufferin St', 'M6A 2T9', 'Toronto', NULL, 'Canada', '', '416-789-3261', 0, 'https://yorkdale.com/', 'other', -79.452170, 43.725430, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(176, 'Young Centre for the Performing Arts', 'Opened in 2006 the Young Centre for the Performing Arts has seen more than 250,000 people attend its performances. The theatre is located within the Distillery Historic District.', '50 Tank House Lane', 'M5A 3C4', 'Toronto', NULL, 'Canada', '', '416-866-8666', 0, 'https://www.youngcentre.ca/', 'art', -79.357670, 43.650930, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(177, 'Young People\'s Theatre', 'The Young People Theatre is a part of the Soulpepper theatre company located within the Distillery Historic District.', '165 Front St E', 'M5A 3Z4', 'Toronto', NULL, 'Canada', '', '416-862-2222', 0, 'https://www.youngpeoplestheatre.org/', 'art', -79.368820, 43.650060, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(178, 'Yuk Yuk\'s', 'Yuk Yuk\'s was established as a comedy club by Mark Breslin in 1976. It is located within Toronto\'s entertainment district and features various comedians doing their stand up routines.', '224 Richmond St W', 'M5V 1V6', 'Toronto', NULL, 'Canada', '', '416-967-6431', 0, 'https://www.yukyuks.com/', 'art', -79.388310, 43.649800, '2025-06-12 16:34:48', '2025-06-12 16:34:48'),
(179, 'Cham Shan Temple', 'Cham Shan Temple, founded in 1973 at 7254 Bayview Avenue in the Greater Toronto Area, is the oldest Chinese Buddhist temple in Toronto and serves as the headquarters of the Buddhist Association of Canada. Its graceful, pagoda-style halls—dedicated to Avalokiteshvara and Ksitigarbha—sit amid over four acres of landscaped grounds, offering a tranquil sanctuary for meditation, Dharma talks, and cultural events. Each year, thousands of worshippers and visitors gather here—especially during Chinese New Year—to light incense, attend prayer services, and experience traditional Chinese architecture and community hospitality', '7254 Bayview Ave, ', 'L3T 2R6', 'Thornhill', '', 'Canada', '', '', 0, '', 'religion', -79.398880, 43.809125, '2025-06-12 20:57:31', '2025-06-29 23:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `availability_attraction`
--

CREATE TABLE `availability_attraction` (
  `availability_id` int(11) NOT NULL,
  `attraction_id` int(11) NOT NULL,
  `weekday` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `availability_attraction`
--

INSERT INTO `availability_attraction` (`availability_id`, `attraction_id`, `weekday`, `start_time`, `end_time`) VALUES
(1, 1, 0, '09:00:00', '18:00:00'),
(2, 1, 1, '08:00:00', '04:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `availability_interpreter`
--

CREATE TABLE `availability_interpreter` (
  `availability_id` int(11) NOT NULL,
  `interpreter_id` int(11) NOT NULL,
  `weekday` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attraction_id` int(11) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `availability_interpreter`
--

INSERT INTO `availability_interpreter` (`availability_id`, `interpreter_id`, `weekday`, `start_time`, `end_time`, `created_at`, `updated_at`, `attraction_id`, `date`) VALUES
(1, 2, 0, '14:00:00', '18:00:00', '2025-06-12 16:50:32', '2025-06-12 17:41:49', 1, '2025-06-15'),
(2, 4, 0, '14:00:00', '18:00:00', '2025-06-15 19:22:02', '2025-06-15 19:22:02', 1, NULL),
(3, 4, 6, '08:00:00', '12:00:00', '2025-06-15 19:24:58', '2025-06-15 19:24:58', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `interpreter_id` int(11) NOT NULL,
  `attraction_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `language_id` int(11) NOT NULL,
  `num_people` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled','rated') NOT NULL DEFAULT 'pending',
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `interpreter_id`, `attraction_id`, `start_time`, `end_time`, `language_id`, `num_people`, `price`, `status`, `rating`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 1, '2025-06-16 14:00:00', '2025-06-16 16:00:00', 184, 4, 45.20, 'pending', NULL, '2025-06-12 17:00:28', '2025-06-12 17:06:20'),
(4, 7, 2, 1, '2025-08-03 16:00:00', '2025-08-03 18:00:00', 185, 2, 22.60, 'cancelled', NULL, '2025-06-29 16:28:45', '2025-06-29 18:41:34'),
(5, 7, 2, 30, '2025-07-13 10:00:00', '2025-07-13 11:30:00', 37, 6, 33.90, 'cancelled', NULL, '2025-06-29 17:20:59', '2025-06-29 19:42:51'),
(6, 7, 2, 1, '2025-06-22 10:00:00', '2025-06-22 12:00:00', 37, 4, 45.20, 'rated', 5, '2025-06-29 20:47:38', '2025-06-29 21:25:06'),
(7, 7, 2, 30, '2025-06-15 04:00:00', '2025-06-15 17:00:00', 184, 8, 45.20, 'rated', 4, '2025-06-29 22:13:04', '2025-06-29 22:15:36'),
(8, 7, 2, 1, '2025-06-08 15:00:00', '2025-06-08 17:00:00', 185, 3, 33.90, 'rated', 5, '2025-06-29 22:47:01', '2025-06-29 22:48:12'),
(9, 7, 2, 30, '2025-06-01 15:00:00', '2025-06-01 16:00:00', 184, 3, 16.95, 'rated', 4, '2025-06-29 23:05:47', '2025-06-29 23:15:25'),
(10, 7, 2, 30, '2025-08-10 15:00:00', '2025-08-10 16:00:00', 37, 3, 16.95, 'pending', NULL, '2025-06-29 23:59:09', '2025-06-29 23:59:09');

-- --------------------------------------------------------

--
-- Table structure for table `interpreter`
--

CREATE TABLE `interpreter` (
  `interpreter_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `bio` varchar(255) NOT NULL,
  `introduction` text NOT NULL,
  `primary_language_id` int(11) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `interpreter`
--

INSERT INTO `interpreter` (`interpreter_id`, `user_id`, `gender`, `bio`, `introduction`, `primary_language_id`, `rating`, `created_at`, `updated_at`) VALUES
(2, 1, 'female', 'I’ll translate the stories of Sir Henry Pellatt and this 1914 Gothic Revival castle. Please feel free to ask for clarification at any time—I’m here to make sure you fully experience Casa Loma’s rich history.', 'My passion for historical architecture and storytelling began in my teenage years when a school trip to Casa Loma sparked my curiosity about Canada’s past. Since then, I am dedicated my career to making history engaging and accessible. Whether translating architectural facts or sharing hidden legends, I create an immersive experience that connects visitors emotionally to the site.', 184, 4.5, '2025-06-12 16:46:07', '2025-06-29 23:15:25'),
(3, 2, 'female', 'Picture early 20th-century Toronto: grand electric lights, lavish parties, and hidden financial woes. I’ll bring to life the triumphs and tragedies of Casa Loma.', 'Picture early 20th-century Toronto: grand electric lights, lavish parties, and hidden financial woes. I’ll bring to life the triumphs and tragedies of Casa Loma.', 184, NULL, '2025-06-12 16:47:08', '2025-06-12 16:47:08'),
(4, 3, 'other', 'Hi, I am Joyce.', 'There is introduction about Joyce.', 185, NULL, '2025-06-14 23:20:01', '2025-06-14 23:20:01'),
(6, 7, 'female', 'Hi, I am Kelly.', 'This is Kelly\'s introduction.', 185, NULL, '2025-06-29 16:34:31', '2025-06-29 16:34:31');

-- --------------------------------------------------------

--
-- Table structure for table `interpreterxattraction`
--

CREATE TABLE `interpreterxattraction` (
  `interpreterxattraction_id` int(11) NOT NULL,
  `interpreter_id` int(11) NOT NULL,
  `attraction_id` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `buffer_time` int(11) DEFAULT NULL,
  `max_traveler` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `interpreterxattraction`
--

INSERT INTO `interpreterxattraction` (`interpreterxattraction_id`, `interpreter_id`, `attraction_id`, `duration`, `buffer_time`, `max_traveler`, `price`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 120, 15, 5, 10.00, '2025-06-12 17:04:57', '2025-06-12 17:04:57'),
(2, 2, 30, 60, NULL, NULL, 5.00, '2025-06-12 17:05:25', '2025-06-12 17:05:57'),
(3, 4, 1, 90, 5, 10, 5.00, '2025-06-15 18:28:43', '2025-06-15 18:28:43'),
(5, 4, 3, 60, NULL, 5, 0.00, '2025-06-15 18:34:14', '2025-06-15 18:34:14'),
(6, 4, 5, 30, 0, NULL, 5.00, '2025-06-15 18:36:17', '2025-06-15 18:36:17');

-- --------------------------------------------------------

--
-- Table structure for table `interpreterxlanguage`
--

CREATE TABLE `interpreterxlanguage` (
  `interpreterxlanguage_id` int(11) NOT NULL,
  `interpreter_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `interpreterxlanguage`
--

INSERT INTO `interpreterxlanguage` (`interpreterxlanguage_id`, `interpreter_id`, `language_id`) VALUES
(9, 2, 37),
(11, 2, 185),
(10, 2, 188),
(3, 3, 37),
(4, 3, 185),
(7, 4, 37),
(8, 6, 37);

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language_id` int(11) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language_id`, `code`, `name`) VALUES
(1, 'aa', 'Afar'),
(2, 'ab', 'Abkhazian'),
(3, 'ae', 'Avestan'),
(4, 'af', 'Afrikaans'),
(5, 'ak', 'Akan'),
(6, 'am', 'Amharic'),
(7, 'an', 'Aragonese'),
(8, 'ar', 'Arabic'),
(9, 'as', 'Assamese'),
(10, 'av', 'Avaric'),
(11, 'ay', 'Aymara'),
(12, 'az', 'Azerbaijani'),
(13, 'ba', 'Bashkir'),
(14, 'be', 'Belarusian'),
(15, 'bg', 'Bulgarian'),
(16, 'bi', 'Bislama'),
(17, 'bm', 'Bambara'),
(18, 'bn', 'Bengali'),
(19, 'bo', 'Tibetan'),
(20, 'br', 'Breton'),
(21, 'bs', 'Bosnian'),
(22, 'ca', 'Catalan; Valencian'),
(23, 'ce', 'Chechen'),
(24, 'ch', 'Chamorro'),
(25, 'co', 'Corsican'),
(26, 'cr', 'Cree'),
(27, 'cs', 'Czech'),
(28, 'cu', 'Church Slavic; Old Slavonic; Church Slavonic;'),
(29, 'cv', 'Chuvash'),
(30, 'cy', 'Welsh'),
(31, 'da', 'Danish'),
(32, 'de', 'German'),
(33, 'dv', 'Divehi; Dhivehi; Maldivian'),
(34, 'dz', 'Dzongkha'),
(35, 'ee', 'Ewe'),
(36, 'el', 'Greek, Modern (1453-)'),
(37, 'en', 'English'),
(38, 'eo', 'Esperanto'),
(39, 'es', 'Spanish; Castilian'),
(40, 'et', 'Estonian'),
(41, 'eu', 'Basque'),
(42, 'fa', 'Persian'),
(43, 'ff', 'Fulah'),
(44, 'fi', 'Finnish'),
(45, 'fj', 'Fijian'),
(46, 'fo', 'Faroese'),
(47, 'fr', 'French'),
(48, 'fy', 'Western Frisian'),
(49, 'ga', 'Irish'),
(50, 'gd', 'Gaelic; Scottish Gaelic'),
(51, 'gl', 'Galician'),
(52, 'gn', 'Guarani'),
(53, 'gu', 'Gujarati'),
(54, 'gv', 'Manx'),
(55, 'ha', 'Hausa'),
(56, 'he', 'Hebrew'),
(57, 'hi', 'Hindi'),
(58, 'ho', 'Hiri Motu'),
(59, 'hr', 'Croatian'),
(60, 'ht', 'Haitian; Haitian Creole'),
(61, 'hu', 'Hungarian'),
(62, 'hy', 'Armenian'),
(63, 'hz', 'Herero'),
(64, 'ia', 'Interlingua (International Auxiliary Language'),
(65, 'id', 'Indonesian'),
(66, 'ie', 'Interlingue; Occidental'),
(67, 'ig', 'Igbo'),
(68, 'ii', 'Sichuan Yi; Nuosu'),
(69, 'ik', 'Inupiaq'),
(70, 'io', 'Ido'),
(71, 'is', 'Icelandic'),
(72, 'it', 'Italian'),
(73, 'iu', 'Inuktitut'),
(74, 'ja', 'Japanese'),
(75, 'jv', 'Javanese'),
(76, 'ka', 'Georgian'),
(77, 'kg', 'Kongo'),
(78, 'ki', 'Kikuyu; Gikuyu'),
(79, 'kj', 'Kuanyama; Kwanyama'),
(80, 'kk', 'Kazakh'),
(81, 'kl', 'Kalaallisut; Greenlandic'),
(82, 'km', 'Central Khmer'),
(83, 'kn', 'Kannada'),
(84, 'ko', 'Korean'),
(85, 'kr', 'Kanuri'),
(86, 'ks', 'Kashmiri'),
(87, 'ku', 'Kurdish'),
(88, 'kv', 'Komi'),
(89, 'kw', 'Cornish'),
(90, 'ky', 'Kirghiz; Kyrgyz'),
(91, 'la', 'Latin'),
(92, 'lb', 'Luxembourgish; Letzeburgesch'),
(93, 'lg', 'Ganda'),
(94, 'li', 'Limburgan; Limburger; Limburgish'),
(95, 'ln', 'Lingala'),
(96, 'lo', 'Lao'),
(97, 'lt', 'Lithuanian'),
(98, 'lu', 'Luba-Katanga'),
(99, 'lv', 'Latvian'),
(100, 'mg', 'Malagasy'),
(101, 'mh', 'Marshallese'),
(102, 'mi', 'Maori'),
(103, 'mk', 'Macedonian'),
(104, 'ml', 'Malayalam'),
(105, 'mn', 'Mongolian'),
(106, 'mr', 'Marathi'),
(107, 'ms', 'Malay'),
(108, 'mt', 'Maltese'),
(109, 'my', 'Burmese'),
(110, 'na', 'Nauru'),
(111, 'nb', 'Bokm?l, Norwegian; Norwegian Bokm?l'),
(112, 'nd', 'Ndebele, North; North Ndebele'),
(113, 'ne', 'Nepali'),
(114, 'ng', 'Ndonga'),
(115, 'nl', 'Dutch; Flemish'),
(116, 'nn', 'Norwegian Nynorsk; Nynorsk, Norwegian'),
(117, 'no', 'Norwegian'),
(118, 'nr', 'Ndebele, South; South Ndebele'),
(119, 'nv', 'Navajo; Navaho'),
(120, 'ny', 'Chichewa; Chewa; Nyanja'),
(121, 'oc', 'Occitan (post 1500)'),
(122, 'oj', 'Ojibwa'),
(123, 'om', 'Oromo'),
(124, 'or', 'Oriya'),
(125, 'os', 'Ossetian; Ossetic'),
(126, 'pa', 'Panjabi; Punjabi'),
(127, 'pi', 'Pali'),
(128, 'pl', 'Polish'),
(129, 'ps', 'Pushto; Pashto'),
(130, 'pt', 'Portuguese'),
(131, 'qu', 'Quechua'),
(132, 'rm', 'Romansh'),
(133, 'rn', 'Rundi'),
(134, 'ro', 'Romanian; Moldavian; Moldovan'),
(135, 'ru', 'Russian'),
(136, 'rw', 'Kinyarwanda'),
(137, 'sa', 'Sanskrit'),
(138, 'sc', 'Sardinian'),
(139, 'sd', 'Sindhi'),
(140, 'se', 'Northern Sami'),
(141, 'sg', 'Sango'),
(142, 'si', 'Sinhala; Sinhalese'),
(143, 'sk', 'Slovak'),
(144, 'sl', 'Slovenian'),
(145, 'sm', 'Samoan'),
(146, 'sn', 'Shona'),
(147, 'so', 'Somali'),
(148, 'sq', 'Albanian'),
(149, 'sr', 'Serbian'),
(150, 'ss', 'Swati'),
(151, 'st', 'Sotho, Southern'),
(152, 'su', 'Sundanese'),
(153, 'sv', 'Swedish'),
(154, 'sw', 'Swahili'),
(155, 'ta', 'Tamil'),
(156, 'te', 'Telugu'),
(157, 'tg', 'Tajik'),
(158, 'th', 'Thai'),
(159, 'ti', 'Tigrinya'),
(160, 'tk', 'Turkmen'),
(161, 'tl', 'Tagalog'),
(162, 'tn', 'Tswana'),
(163, 'to', 'Tonga (Tonga Islands)'),
(164, 'tr', 'Turkish'),
(165, 'ts', 'Tsonga'),
(166, 'tt', 'Tatar'),
(167, 'tw', 'Twi'),
(168, 'ty', 'Tahitian'),
(169, 'ug', 'Uighur; Uyghur'),
(170, 'uk', 'Ukrainian'),
(171, 'ur', 'Urdu'),
(172, 'uz', 'Uzbek'),
(173, 've', 'Venda'),
(174, 'vi', 'Vietnamese'),
(175, 'vo', 'Volap??k'),
(176, 'wa', 'Walloon'),
(177, 'wo', 'Wolof'),
(178, 'xh', 'Xhosa'),
(179, 'yi', 'Yiddish'),
(180, 'yo', 'Yoruba'),
(181, 'za', 'Zhuang; Chuang'),
(182, 'zh', 'Chinese'),
(183, 'zu', 'Zulu'),
(184, '', 'Cantonese'),
(185, '', 'Madarin'),
(188, NULL, 'Hong Kong Sign Language');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role` enum('user','attraction','admin') NOT NULL DEFAULT 'user',
  `phone` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password_hash`, `name`, `role`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'tommie@admin.ca', '$2b$10$mT/GAnQwStD27r2Zhjq2HeoT9/dI/HU3cpicP5dLHL61O4SxrydoS', 'Tommie', 'admin', '6476064791', '2025-06-03 14:51:10', '2025-06-16 19:44:29'),
(2, 'audrey@traveler.ca', '$2b$10$mT/GAnQwStD27r2Zhjq2HeoT9/dI/HU3cpicP5dLHL61O4SxrydoS', 'Audrey', 'user', NULL, '2025-06-03 15:40:17', '2025-06-30 19:17:14'),
(3, 'joyce@traverler.com', '', 'Joyce Lin', '', '+1 647 333 4444', '2025-06-12 18:02:33', '2025-06-12 18:02:33'),
(5, 'ken@traverler.ca', '', 'Ken Sze', '', '467-333-4444', '2025-06-14 23:39:16', '2025-06-14 23:39:38'),
(6, 'peiyu@traveler.ca', '$2b$10$mT/GAnQwStD27r2Zhjq2HeoT9/dI/HU3cpicP5dLHL61O4SxrydoS', 'Peiyu', 'user', NULL, '2025-06-16 19:43:39', '2025-06-30 19:16:40'),
(7, 'kelly@traveler.ca', '$2b$10$C8KBdf9amg6sCgbHYOSs1OH2/KdFeQefupHCtZ3gHrPkmiZlRKTLS', 'Kelly', 'user', NULL, '2025-06-16 20:35:20', '2025-06-30 19:16:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attraction`
--
ALTER TABLE `attraction`
  ADD PRIMARY KEY (`attraction_id`);

--
-- Indexes for table `availability_attraction`
--
ALTER TABLE `availability_attraction`
  ADD PRIMARY KEY (`availability_id`),
  ADD KEY `fk_avattract_attraction` (`attraction_id`);

--
-- Indexes for table `availability_interpreter`
--
ALTER TABLE `availability_interpreter`
  ADD PRIMARY KEY (`availability_id`),
  ADD KEY `fk_avinterp_interpreter` (`interpreter_id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `traveler_id_idx` (`user_id`),
  ADD KEY `interpreter_id_idx` (`interpreter_id`),
  ADD KEY `attraction_id_idx` (`attraction_id`),
  ADD KEY `language_id_idx` (`language_id`);

--
-- Indexes for table `interpreter`
--
ALTER TABLE `interpreter`
  ADD PRIMARY KEY (`interpreter_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `user_id_idx` (`user_id`),
  ADD KEY `primary_language_id_idx` (`primary_language_id`);

--
-- Indexes for table `interpreterxattraction`
--
ALTER TABLE `interpreterxattraction`
  ADD PRIMARY KEY (`interpreterxattraction_id`),
  ADD KEY `attraction_id_idx` (`attraction_id`),
  ADD KEY `interpreter_id_idx` (`interpreter_id`);

--
-- Indexes for table `interpreterxlanguage`
--
ALTER TABLE `interpreterxlanguage`
  ADD PRIMARY KEY (`interpreterxlanguage_id`),
  ADD UNIQUE KEY `combine` (`interpreter_id`,`language_id`),
  ADD KEY `interpreter_id_idx` (`interpreter_id`),
  ADD KEY `language_id_idx` (`language_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attraction`
--
ALTER TABLE `attraction`
  MODIFY `attraction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `availability_attraction`
--
ALTER TABLE `availability_attraction`
  MODIFY `availability_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `availability_interpreter`
--
ALTER TABLE `availability_interpreter`
  MODIFY `availability_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `interpreter`
--
ALTER TABLE `interpreter`
  MODIFY `interpreter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `interpreterxattraction`
--
ALTER TABLE `interpreterxattraction`
  MODIFY `interpreterxattraction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `interpreterxlanguage`
--
ALTER TABLE `interpreterxlanguage`
  MODIFY `interpreterxlanguage_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `availability_attraction`
--
ALTER TABLE `availability_attraction`
  ADD CONSTRAINT `fk_avattract_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `attraction` (`attraction_id`);

--
-- Constraints for table `availability_interpreter`
--
ALTER TABLE `availability_interpreter`
  ADD CONSTRAINT `fk_avinterp_interpreter` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreter` (`interpreter_id`);

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_booking_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `attraction` (`attraction_id`),
  ADD CONSTRAINT `fk_booking_interpreter` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreter` (`interpreter_id`),
  ADD CONSTRAINT `fk_booking_language` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`),
  ADD CONSTRAINT `fk_booking_traveler` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `interpreter`
--
ALTER TABLE `interpreter`
  ADD CONSTRAINT `fk_interpreter_language` FOREIGN KEY (`primary_language_id`) REFERENCES `language` (`language_id`),
  ADD CONSTRAINT `fk_interpreter_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `interpreterxattraction`
--
ALTER TABLE `interpreterxattraction`
  ADD CONSTRAINT `fk_ixattraction_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `attraction` (`attraction_id`),
  ADD CONSTRAINT `fk_ixattraction_interpreter` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreter` (`interpreter_id`);

--
-- Constraints for table `interpreterxlanguage`
--
ALTER TABLE `interpreterxlanguage`
  ADD CONSTRAINT `fk_ixlanguage_interpreter` FOREIGN KEY (`interpreter_id`) REFERENCES `interpreter` (`interpreter_id`),
  ADD CONSTRAINT `fk_ixlanguage_language` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

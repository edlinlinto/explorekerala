import { useEffect, useMemo, useState } from "react";
import "./App.css";

const destinations = [
{
name: "Munnar",
district: "Idukki",
category: "Nature",
cost: 1800,
days: 1,
image:
"https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=80",
description: "Explore rolling tea gardens, misty hills and scenic viewpoints.",
tag: "Popular",
},
{
name: "Alappuzha",
district: "Alappuzha",
category: "Backwaters",
cost: 2200,
days: 1,
image:
"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
description: "Enjoy peaceful backwaters, houseboats and village life.",
tag: "Relaxing",
},
{
name: "Athirappilly",
district: "Thrissur",
category: "Nature",
cost: 1200,
days: 1,
image:
"https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=80",
description: "Discover a spectacular waterfall surrounded by greenery.",
tag: "Hidden gem",
},
{
name: "Fort Kochi",
district: "Ernakulam",
category: "Culture",
cost: 1000,
days: 1,
image:
"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80",
description: "Explore heritage streets, art cafes and coastal views.",
tag: "Heritage",
},
{
name: "Wayanad",
district: "Wayanad",
category: "Adventure",
cost: 2000,
days: 1,
image:
"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
description: "Experience forest trails, viewpoints and green landscapes.",
tag: "Adventure",
},
{
name: "Kovalam",
district: "Thiruvananthapuram",
category: "Beach",
cost: 1500,
days: 1,
image:
"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
description: "Unwind by the sea and enjoy a beautiful beach sunset.",
tag: "Beach escape",
},
];

const categories = ["All", "Nature", "Backwaters", "Culture", "Adventure", "Beach"];

function App() {
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [apiDestinations, setApiDestinations] = useState([]);
useEffect(() => {
fetch("http://localhost:5000/api/destinations")
.then((response) => {
if (!response.ok) {
throw new Error("Failed to fetch destinations");
}
return response.json();
})
.then((data) => {
console.log("API destinations:", data);
setApiDestinations(data);
})
.catch((error) => {
console.error("Error fetching destinations:", error);
});
}, []);
const displayDestinations = apiDestinations.length
? apiDestinations.map((place) => {
const existingPlace = destinations.find(
(item) => item.name === place.name
);

return {  
      ...existingPlace,  
      ...place,  
      cost: place.estimatedCost,  
      days: existingPlace?.days ?? 1,  
      image: existingPlace?.image ?? "",  
      description: existingPlace?.description ?? "",  
      tag: existingPlace?.tag ?? "Explore",  
    };  
  })  
: destinations;  
console.log("Destinations to display:", displayDestinations.length);

const [budget, setBudget] = useState("3000");
const [startingPoint, setStartingPoint] = useState("Thrissur");
const [days, setDays] = useState("1");
const [interest, setInterest] = useState("Nature");
const [plan, setPlan] = useState(null);
const [saved, setSaved] = useState([]);

const filteredDestinations = useMemo(() => {
  return displayDestinations.filter((place) => {
    const matchesSearch =
      `${place.name} ${place.district} ${place.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || place.category === category;

    return matchesSearch && matchesCategory;
  });
}, [displayDestinations, search, category]);

function createPlan(event) {
  event.preventDefault();

  const amount = Number(budget);
  const duration = Number(days);

  if (!amount || amount <= 0) {
    setPlan({ error: "Please enter a valid budget." });
    return;
  }

  const matching = displayDestinations.filter(
    (place) =>
      (interest === "Any" || place.category === interest) &&
      Number(place.cost) > 0 &&
      Number(place.cost) * duration <= amount
  );

  const places = matching.slice(0, Math.min(duration, 3));

  const totalCost = places.reduce(
    (total, place) => total + Number(place.cost) * duration,
    0
  );

  setPlan({
    places,
    budget: amount,
    days: duration,
    startingPoint,
    totalCost,
    food: Math.round(totalCost * 0.25),
    transport: Math.round(totalCost * 0.20),
    accommodation: Math.round(totalCost * 0.35),
    activities: Math.round(totalCost * 0.20),
    itinerary: places.map((place, index) => ({
      day: index + 1,
      name: place.name,
    })),
  });
}

function toggleSaved(name) {
setSaved((current) =>
current.includes(name)
? current.filter((item) => item !== name)
: [...current, name]
);
}

function scrollToPlanner() {
document.getElementById("planner")?.scrollIntoView({
behavior: "smooth",
});
}

return (
<div className="site">
<header className="navbar">
<a className="brand" href="#home">
<span className="brand-icon">✳</span>
Explore<span>Kerala</span>
</a>

<nav className="nav-links">  
      <a href="#home">Home</a>  
      <a href="#destinations">Destinations</a>  
      <a href="#planner">Plan a Trip</a>  
      <a href="#hidden-gems">Hidden Gems</a>  
    </nav>  

    <button className="nav-button" onClick={scrollToPlanner}>  
      Plan My Trip <span>↗</span>  
    </button>  
  </header>  

  <main>  
    <section className="hero" id="home">  
      <div className="hero-shade" />  
      <div className="hero-content">  
        <div className="eyebrow hero-eyebrow">  
          <span /> YOUR JOURNEY, YOUR KERALA  
        </div>  
        <h1>  
          Find your own  
          <br />  
          <em>piece of paradise.</em>  
        </h1>  
        <p>  
          Discover beautiful places, explore local experiences and plan  
          a Kerala trip that fits your time, interests and budget.  
        </p>  

        <div className="hero-actions">  
          <button className="primary-button" onClick={scrollToPlanner}>  
            Create My Trip <span>↗</span>  
          </button>  
          <a className="text-button" href="#destinations">  
            Explore destinations ↓  
          </a>  
        </div>  

        <div className="hero-stats">  
          <div>  
            <strong>14</strong>  
            <span>Beautiful districts</span>  
          </div>  
          <div>  
            <strong>∞</strong>  
            <span>Ways to explore</span>  
          </div>  
          <div>  
            <strong>1</strong>  
            <span>Unforgettable Kerala</span>  
          </div>  
        </div>  
      </div>  

      <div className="hero-note">  
        <span className="note-icon">✦</span>  
        <div>  
          <strong>Your trip, thoughtfully planned</strong>  
          <span>Discover more. Plan smarter. Travel better.</span>  
        </div>  
      </div>  
    </section>  

    <section className="intro section-wrap">  
      <div>  
        <span className="eyebrow">A LITTLE MORE THAN A TRIP</span>  
        <h2>  
          Kerala is calling.  
          <br />  
          <em>Where will you go?</em>  
        </h2>  
      </div>  
      <p>  
        From misty mountains to calm backwaters, ExploreKerala helps you  
        find places you'll love without spending hours planning. Start  
        with your budget, choose your interests, and let the journey begin.  
      </p>  
    </section>  

    <section className="destinations section-wrap" id="destinations">  
      <div className="section-heading">  
        <div>  
          <span className="eyebrow">THE PLACES THAT STAY WITH YOU</span>  
          <h2>Find your <em>next escape.</em></h2>  
        </div>  
        <span className="result-count">  
          {filteredDestinations.length} destinations  
        </span>  
      </div>  

      <div className="destination-tools">  
        <label className="search-box">  
          <span>⌕</span>  
          <input  
            value={search}  
            onChange={(event) => setSearch(event.target.value)}  
            placeholder="Search places or districts..."  
            aria-label="Search destinations"  
          />  
        </label>  

        <div className="category-list">  
          {categories.map((item) => (  
            <button  
              key={item}  
              className={`category-chip ${category === item ? "active" : ""}`}  
              onClick={() => setCategory(item)}  
            >  
              {item}  
            </button>  
          ))}  
        </div>  
      </div>  

      <div className="destination-grid">  
        {filteredDestinations.map((place) => (  
          <article className="destination-card" key={place.name}>  
            <div className="card-image">  
              <img src={place.image} alt={place.name} loading="lazy" />  
              <span className="place-tag">{place.tag}</span>  
              <button  
                className={`save-button ${saved.includes(place.name) ? "saved" : ""}`}  
                onClick={() => toggleSaved(place.name)}  
                aria-label={`Save ${place.name}`}  
                title="Save destination"  
              >  
                {saved.includes(place.name) ? "♥" : "♡"}  
              </button>  
            </div>  

            <div className="card-content">  
              <div className="place-location">  
                <span>⌖</span> {place.district}, Kerala  
              </div>  
              <h3>{place.name}</h3>  
              <p>{place.description}</p>  
              <div className="card-bottom">  
                <div>  
                  <span className="small-label">EST. BUDGET / PERSON</span>  
                  <strong>₹{place.cost.toLocaleString("en-IN")}</strong>  
                </div>  
                <button  
                  className="arrow-button"  
                  onClick={() => {  
                    setInterest(place.category);  
                    scrollToPlanner();  
                  }}  
                  aria-label={`Plan a trip to ${place.name}`}  
                >  
                  ↗  
                </button>  
              </div>  
            </div>  
          </article>  
        ))}  
      </div>  

      {filteredDestinations.length === 0 && (  
        <div className="empty-state">  
          <span>⌕</span>  
          <h3>No destinations found</h3>  
          <p>Try another place name or choose a different category.</p>  
          <button  
            className="primary-button"  
            onClick={() => {  
              setSearch("");  
              setCategory("All");  
            }}  
          >  
            Show all destinations  
          </button>  
        </div>  
      )}  
    </section>  

    <section className="planner-section" id="planner">  
      <div className="planner-layout section-wrap">  
        <div className="planner-copy">  
          <span className="eyebrow">LESS GUESSWORK, MORE GETAWAY</span>  
          <h2>  
            Your perfect trip,  
            <br />  
            <em>within your budget.</em>  
          </h2>  
          <p>  
            Tell us a little about your plans. We'll suggest destinations  
            that match your interests, available time and estimated budget.  
          </p>  

          <div className="planner-benefit">  
            <span>01</span>  
            <div>  
              <strong>Made around you</strong>  
              <p>Recommendations based on your travel preferences.</p>  
            </div>  
          </div>  
          <div className="planner-benefit">  
            <span>02</span>  
            <div>  
              <strong>Budget conscious</strong>  
              <p>Compare estimated trip costs before you leave.</p>  
            </div>  
          </div>  
          <div className="planner-benefit">  
            <span>03</span>  
            <div>  
              <strong>More time exploring</strong>  
              <p>Spend less time searching and more time discovering.</p>  
            </div>  
          </div>  
        </div>  

        <form className="planner-form" onSubmit={createPlan}>  
          <div className="form-title">  
            <div>  
              <span className="eyebrow">YOUR NEXT ADVENTURE</span>  
              <h3>Let's plan your trip</h3>  
            </div>  
            <span className="form-spark">✳</span>  
          </div>  

          <label>  
            Starting location  
            <input  
              value={startingPoint}  
              onChange={(event) => setStartingPoint(event.target.value)}  
              placeholder="e.g. Thrissur"  
              required  
            />  
          </label>  

          <div className="form-row">  
            <label>  
              Total budget (₹)  
              <input  
                type="number"  
                min="1"  
                value={budget}  
                onChange={(event) => setBudget(event.target.value)}  
                required  
              />  
            </label>  
            <label>  
              Available time  
              <select  
                value={days}  
                onChange={(event) => setDays(event.target.value)}  
              >  
                <option value="1">1 day</option>  
                <option value="2">2 days</option>  
                <option value="3">3 days</option>  
                <option value="5">5 days</option>  
                <option value="7">7 days</option>  
              </select>  
            </label>  
          </div>  

          <label>  
            What kind of trip do you like?  
            <select  
              value={interest}  
              onChange={(event) => setInterest(event.target.value)}  
            >  
              <option>Nature</option>  
              <option>Backwaters</option>  
              <option>Culture</option>  
              <option>Adventure</option>  
              <option>Beach</option>  
              <option>Any</option>  
            </select>  
          </label>  

          <button className="primary-button planner-submit" type="submit">  
            Find My Trip <span>↗</span>  
          </button>  
          <p className="form-disclaimer">  
            Estimates are illustrative, not live travel prices.  
          </p>  

          {plan && (
  <div className="plan-results" aria-live="polite">
    {plan.error ? (
      <p>{plan.error}</p>
    ) : (
      <>
        <span className="eyebrow">YOUR PERSONALIZED TRIP</span>

        <h3>
          {plan.places.length > 0
            ? "Your Trip Plan"
            : "Let's adjust your plan"}
        </h3>

        <p>
          Starting from {plan.startingPoint || "your location"} ·{" "}
          {plan.days} {plan.days === 1 ? "day" : "days"} · Budget ₹
          {plan.budget.toLocaleString("en-IN")}
        </p>

        {plan.places.length > 0 ? (
          <>
            <h4>Day-by-Day Itinerary</h4>

            {plan.itinerary.map((item) => (
              <div className="result-place" key={item.day}>
                <div>
                  <strong>Day {item.day}: {item.name}</strong>
                  <span>Explore and enjoy this destination.</span>
                </div>
              </div>
            ))}

            {plan.days > plan.itinerary.length && (
              <p>
                Remaining days: Explore nearby attractions or enjoy
                local experiences and relaxation.
              </p>
            )}

            <h4>Estimated Budget Breakdown</h4>

            <div className="result-place">
              <div>
                <strong>Food</strong>
                <span>₹{plan.food.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="result-place">
              <div>
                <strong>Transport</strong>
                <span>₹{plan.transport.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="result-place">
              <div>
                <strong>Accommodation</strong>
                <span>₹{plan.accommodation.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="result-place">
              <div>
                <strong>Activities</strong>
                <span>₹{plan.activities.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <h4>
              Total Estimated Cost: ₹
              {plan.totalCost.toLocaleString("en-IN")}
            </h4>

            <h4>Recommended Destinations</h4>

          {plan.places.map((place) => (
  <div className="result-place" key={place.name}>
    <img src={place.image} alt={place.name} />

    <div>
      <strong>{place.name}</strong>
      <span>
        Approx. ₹
        {(Number(place.cost) * plan.days).toLocaleString("en-IN")}
      </span>
    </div>

    <button
      type="button"
      onClick={() => toggleSaved(place.name)}
      aria-label={`Save ${place.name}`}
    >
      {saved.includes(place.name) ? "♥" : "♡"}
    </button>
  </div>
))}  
            
          </>
        ) : (
          <p>
            No matches for these preferences. Try a larger budget
            or select "Any" for more options.
          </p>
        )}

        <p className="result-note">
          Costs are approximate estimates, not live prices. Actual expenses
          may vary depending on transport, accommodation, travel dates,
          group size and entry fees.
        </p>
      </>
    )}
  </div>
)}
        </form>  
      </div>  
    </section>  

    <section className="hidden-section section-wrap" id="hidden-gems">  
      <div className="hidden-heading">  
        <span className="eyebrow">BEYOND THE USUAL</span>  
        <h2>Little-known places. <em>Big memories.</em></h2>  
        <p>  
          Find a quieter side of Kerala through lesser-known nature spots,  
          local food, art and community experiences.  
        </p>  
      </div>  

      <div className="experience-grid">  
        <article className="experience-card">  
          <img  
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80"  
            alt="Green forest landscape"  
            loading="lazy"  
          />  
          <div>  
            <span>FOR NATURE LOVERS</span>  
            <h3>Take the scenic route</h3>  
            <p>Look beyond the crowded viewpoints and explore nature responsibly.</p>  
          </div>  
        </article>  
        <article className="experience-card">  
          <img  
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"  
            alt="A meal ready to be shared"  
            loading="lazy"  
          />  
          <div>  
            <span>FOR FOOD EXPLORERS</span>  
            <h3>Taste local Kerala</h3>  
            <p>Discover regional dishes and local food experiences.</p>  
          </div>  
        </article>  
        <article className="experience-card">  
          <img  
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80"  
            alt="Creative handmade crafts"  
            loading="lazy"  
          />  
          <div>  
            <span>FOR CULTURE SEEKERS</span>  
            <h3>Meet the makers</h3>  
            <p>Explore handmade crafts, creative communities and local traditions.</p>  
          </div>  
        </article>  
      </div>  
    </section>  

    <section className="closing-banner">  
      <span className="eyebrow">YOUR KERALA STORY STARTS HERE</span>  
      <h2>Go where the feeling takes you.</h2>  
      <p>Find your place. Plan your way. Make it memorable.</p>  
      <button className="light-button" onClick={scrollToPlanner}>  
        Plan Your Kerala Escape ↗  
      </button>  
    </section>  
  </main>  

  <footer className="footer">
  <a className="brand footer-brand" href="#home">
    <span className="brand-icon">✳</span>
    Explore<span>Kerala</span>
  </a>

  <p>Discover more. Plan smarter. Travel better.</p>

  <div className="footer-links">
    <a href="#home">Home</a>
    <a href="#destinations">Destinations</a>
    <a href="#planner">Plan a Trip</a>
    <a href="#hidden-gems">Hidden Gems</a>
  </div>

  <p className="footer-copy">
    © {new Date().getFullYear()} ExploreKerala. Made for travellers.
  </p>
  </footer>
  </div>
  );
  }

  export default App;
  
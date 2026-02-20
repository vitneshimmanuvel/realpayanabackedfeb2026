const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const testimonials = [
  {
    name: "Rajendran Sakthivel",
    video_url: "https://player.vimeo.com/video/1103351104?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&controls=0&sharing=0&autoplay=0&loop=0"
  },
  {
    name: "Mrs. Manju",
    video_url: "https://player.vimeo.com/video/1081228912?h=477900a8cb&title=0&byline=0&portrait=0&badge=0&controls=0&sharing=0&autoplay=0&loop=0"
  },
  {
    name: "Ms Jeslin Sabatini",
    video_url: "https://player.vimeo.com/video/1084259988?badge=0&title=0&byline=0&portrait=0&controls=0&sharing=0&autoplay=0&loop=0"
  },
  {
    name: "Ms Mohana Sangari",
    video_url: "https://player.vimeo.com/video/1078787624?h=8817470ba2&title=0&byline=0&portrait=0&badge=0&controls=0&sharing=0&autoplay=0&loop=0"
  },
  {
    name: "Mr Haree Harun",
    video_url: "https://player.vimeo.com/video/1084259918?badge=0&title=0&byline=0&portrait=0&badge=0&controls=0&sharing=0&autoplay=0&loop=0"
  },
  {
    name: "Mr Vignesh Sivakumar",
    video_url: "https://player.vimeo.com/video/1090840248?h=0b3a8f1943&title=0&byline=0&portrait=0&badge=0&controls=0&sharing=0&autoplay=0&loop=0"
  },
  {
    name: "Mr Neil Issac",
    video_url: "https://player.vimeo.com/video/1090840047?h=a28c1515af&title=0&byline=0&portrait=0&badge=0&controls=0&sharing=0&autoplay=0&loop=0"
  }
];

const seedTestimonials = async () => {
  try {
    console.log('Connecting to database...');
    
    // Optional: Clear existing testimonials
    // await pool.query('DELETE FROM testimonials');
    // console.log('Cleared existing testimonials');

    for (let i = 0; i < testimonials.length; i++) {
        const t = testimonials[i];
        const query = `
            INSERT INTO testimonials (video_url, name, prefix, display_order, is_active)
            VALUES ($1, $2, $3, $4, true)
            RETURNING *
        `;
        const values = [t.video_url, t.name, 'None', i];
        
        const res = await pool.query(query, values);
        console.log(`Inserted: ${res.rows[0].name}`);
    }

    console.log('🎉 Seeding completed successfully');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    pool.end();
  }
};

seedTestimonials();

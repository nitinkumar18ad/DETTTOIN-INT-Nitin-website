import { Router } from "express";
import { announcements } from "../data/announcements.js";
import { heroSlides } from "../data/heroSlides.js";
import { navItems } from "../data/navItems.js";
import { newsEvents } from "../data/newsEvents.js";
import { values } from "../data/values.js";

const router = Router();

router.get("/nav", (request, response) => {
  response.json(navItems);
});

router.get("/hero-slides", (request, response) => {
  response.json(heroSlides);
});

router.get("/announcements", (request, response) => {
  response.json(announcements);
});

router.get("/news-events", (request, response) => {
  response.json(newsEvents);
});

router.get("/values", (request, response) => {
  response.json(values);
});

router.get("/home", (request, response) => {
  response.json({
    navItems,
    heroSlides,
    announcements,
    newsEvents,
    values
  });
});

export default router;

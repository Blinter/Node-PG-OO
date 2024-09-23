# Exercise


## Parts 1-4
Reading through codebase

## **Part Five: Full Names**

In several templates, we show customer names as `{{ firstName }} {{ lastName }}`. This is slightly tedious, that we have to write out both fields, but also might be inflexible for future data changes: what if we added a middle name field later? What if we added a prefix field for labels like “Ms.” or “Dr.”?

Add a function, `fullName`, to the Customer class. This should (for now) return first and last names joined by a space. Change the templates to refer directly to this.

## **Part Six: Saving Reservations**

We’ve already written a ***.save()*** method for customers. This either adds a new customer if they’re new, or updates the existing record if there are changes.

We don’t yet have a similar method for reservations, but we need one in order to save reservations. Write this.

---

(Optional FS to do)

## **Further Study**

### **Part Seven: Add Search Functionality**

It would be nice to search for a customer by name, rather than having to find them in a list. Add a quick search form to the bootstrap navigation bar to search for a customer by name.

Do this by continuing the pattern of abstracting database operations to the model classes — any route(s) you write shouldn’t directly use the database. Think of a good name for any new methods on the class.

You can either make a new route and template to show results, or you could probably make it work with the existing listing index route and template (as you’d prefer).

### **Part Eight: Best Customers**

We like to show our best customers — those that have made the most reservations. Add a new route that finds our top 10 customers ordered by most reservations.

Like before, do this by adding functionality to the model class, so that there isn’t SQL directly in your route handlers.

Make sure you do this counting work in the database, rather than trying to do all the counting in Javascript.

### **Other fun things!**

- Should you wish to continue with these ideas, there is plenty of other functionality you could add to this system:
- Add a new field for middle name, which can be optional, but should appear in the full name displays.
- Add a feature to edit existing reservations. Make sure to keep SQL out of the routes themselves.
- On the customer listing page, show the most recent reservation for each. Make sure when you do this that you continue to list all customers, even those without any reservations!
- This uses the “Moment.js” library to format dates prettily. This is a powerful library for handling all sorts of time/date features. This is often used by websites to show “pretty relative dates”, like “5 minutes ago”, “1 week ago”, “more than 2 years ago”, and so on. Learn about this feature and change the customer detail page to show the most recent reservation for every customer, but with one of these pretty versions.
- Research how to write tests with supertest when you have a template-based Express app. Then write some tests for your routes! (You can unit test your model methods too.)
- Add proper full-text search (that can handle things more faster and more flexibly than ILIKE queries). PostgreSQL has a very comprehensive FTS (full text search) system. You can read about this. (Link)[https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/]

- This is a pretty big feature to learn about and add, but this might be a neat weekend day project if you’re interested in learning more about real-world backend search.
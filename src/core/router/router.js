import { Layout } from "@/components/layout/layout.component";
import { NotFound } from "@/components/screens/not-found/not-found.components";

import { ROUTES } from "./routes.data";
export class Router {
  #router = ROUTES;
  #currentRoute = null;
  #layout = null;
  constructor() {
    window.addEventListener("popstate", () => {
      this.#handleRouteChange();
    });
    this.#handleRouteChange();
    this.#handleLinks();
  }

  navigate(path) {
    if (path !== this.getCurrentPath()) {
      window.history.pushState({}, "", path);
      this.#handleRouteChange();
    }
  }

  #handleLinks() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("a");

      if (target) {
        event.preventDefault();
        this.navigate(target.href);
      }
    });
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  #handleRouteChange() {
    const path = this.getCurrentPath() || "/";
    let route = this.#router.find((route) => route.path === path);

    if (!route) {
      route = {
        component: NotFound,
      };
    }
    this.#currentRoute = route;
    this.#render();
  }

  #render() {
    const component = new this.#currentRoute.component();
    //если нет layout, то создаем. чтобы не было дубликата его, и зря не перезагружался
    if (!this.#layout) {
      this.#layout = new Layout({ router: this, children: component.render() });
      document.getElementById("app").innerHTML = this.#layout.render();
    } else {
      document.querySelector("main").innerHTML = component.render();
    }
  }
}

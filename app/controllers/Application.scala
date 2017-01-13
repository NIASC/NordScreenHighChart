package controllers

import play.api._
import play.api.mvc._
import play.api.i18n.Messages

object Application extends Controller {

  def index = Action {
    Ok(views.html.finland(Messages("subheader.finland")))
  }

  def finland = Action {
    Ok(views.html.finland(Messages("subheader.finland")))
  }

  def norway = Action {
    Ok(views.html.norway(Messages("subheader.norway")))
  }

}
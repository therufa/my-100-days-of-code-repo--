case class Person(name: String, age: Int)

@main def hello: Unit =
  println(area(circle))
  println(area(rectangle))
  // instantiate a Person adnd print it's name
  val person = Person("John Don", 30)
  println(person.name)
end hello

def hellos: Unit =
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.decreaseSajt()

  println(s"Number of sajt ${Sajt.getSajt()}")
end hellos

object Sajt:
  var sajt = 1
  def increaseSajt(): Unit = sajt += 1
  def decreaseSajt(): Unit = sajt -= 1
  def getSajt(): Int = sajt
end Sajt

sealed trait Shape
case class Circle(radius: Double) extends Shape
case class Rectangle(width: Double, height: Double) extends Shape

def area(shape: Shape): Double = shape match {
  case Circle(r)       => math.Pi * r * r
  case Rectangle(w, h) => w * h
}

val circle = Circle(5.0)
val rectangle = Rectangle(3.0, 4.0)

@main def hello: Unit =
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.increaseSajt()
  Sajt.decreaseSajt()

  println(s"Number of sajt ${Sajt.getSajt()}")

object Sajt:
  var sajt = 1
  def increaseSajt(): Unit = sajt += 1
  def decreaseSajt(): Unit = sajt -= 1
  def getSajt(): Int = sajt

import java.util.function.Function;
public class ActivationFunctions {
  
  public static final Function <Double, Double> ReLU = x -> Math.max (0, x);

  public static final Function <Double, Double> ReLuDeri = x -> x < 0 ? 1 : 0;
}

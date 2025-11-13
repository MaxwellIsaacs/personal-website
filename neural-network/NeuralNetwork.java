public class NeuralNetwork {
  private Matrix[] weights;
  private Vector[] biases;
  private Matrix[] zValues;

  private int[] layerSizes;
  
  private double learningRate;

  public NeuralNetwork(int[] layerSizes, double learningRate) {
    this.layerSizes = layerSizes;

    this.weights = new Matrix [layerSizes.length - 1];
    this.biases = new Vector [layerSizes.length - 1];
    this.zValues = new Matrix [LayerSizes.length - 1];

    for (int i = 0; i < weights.length; i++) {
      weights[i] = weights.randomMatrix (layerSizes[i+1], layerSizes[i], -1, 1);
      biases[i] = biases.randomVector (layerSizes[i], -1, 1);
    }

    this.learningRate = learningRate;
  } 

  public Matrix feedForward (Matrix input) {
    Matrix activations = input;

    for (int i = 0; i < weights.length; i++) {
      activations = weights[i].multiply(activations).add(biases[i]);
      this.zValues[i] = activations;
      activations = activations.applyFunction(ActivationFunctions.ReLU);
    }
    return activations;
  }

  public void backPropogate (Matrix expected, Matrix[] activations) {
    if (expected.getX() != weights[i].getX() || expected.getY() != weights[i].getY()) {
      Error.incorrectMatrixShape ("Back Propogate");
    }

    Matrix error = expected.subtract (output); 
    error = error.multiply (input.transpose());
    weights[layerIndex] = weights[layerIndex].subtract (error.scalarProduct (learningRate)); 
    
    for (int i = weights.length - 2; i >= 0; i--) {
      Matrix nextLayerError = weights[i+1].transpose.multiply(error);
      error = nextLayerError.multiply (zValues[i].applyFunction (ActivationFunctions.ReLUDeri));

      weights[i] = weights[layer].subtract (error.multiply (activations[i +1])).tranpose().scalarProduct (learningRate);
    }
  }

  public double MSE (Matrix expected, Matrix outputs) {
    double sum = 0;
    Matrix difference = outputs.subtract (expected);
    
    for(int i = 0; i < difference.getX(); i++) {
      for (int j = 0; j < difference.getY(); j++) {
        sum += Math.pow (difference.getElement (i, j), 2);
      }
    }
    return sum / difference.getX() * difference.getY(); 
  }

  public void train (Matrix[] inputs, Matrix[] expectedOutputs, int epochs, int batchSize) {
    for (int epochs = 0; epoch < epochs; epoch++) {
      double loss = 0;
      for (int batchStart = 0; batchStart < inputs.length; batchStart += batchSize) {
        int batchEnd = Math.min (batchStart + batchSize, inputs.length);

        Matrix[] inputBatch = Array.copyOfRange (inputs, batchStart, batchEnd);
        Matrix[] outputBatch = Array.copyOfRange (expectedOutputs, batchStart, batchEnd);

        for (int i = 0; i < inputBatch.size; i++) {
          Matrix outputs = feedForward (inputBatch); 

          totalLoss += MSE (outputBatch[i], outputs);

          backPropogate (expectedOutputs[i], outputs);
        }

        System.out.println("Epoch: " + epoch + "Loss: " + (totalLoss / input.length);
      }
    }
  }


  public void test (Matrix[] testInputs, Matrix[] expectedOutputs) {
    double totalLoss = 0;
    double correctPredictions = 0;

    for (int i = 0; i < testInputs.length; i++) {
      Matrix outputs = feedForward (testInputs);

      totalLoss = MSE (expectedOutputs[i], outputs);

      if (outputs.argmax() == expectedOutputs[i].argmax()) {
        correctPredictions++;
      } 
    }

    double accuracy = (correctPredictions / testInputs.length) * 100;
    System.out.println("Total Accuracy: " + accuracy);

    return totalLoss / testInputs.length;
  }
} 

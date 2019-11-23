import numpy as np
from keras.models import load_model
from keras import backend as K
import os

def result(x):
    K.clear_session() # clear session every time
    model = load_model(os.path.abspath(os.path.dirname(__file__)) + '/cnn_mnist_model.h5')
    # __file__ : カレントディレクトリからのファイルパスを取得
    x = np.expand_dims(x, axis=0)
    x = x.reshape(x.shape[0],28,28,1)
    r = np.argmax(model.predict(x)) # argmaxを用いることで1の値を抽出できる
    return int(r)

if __name__ == "__main__":
    from keras.datasets import mnist

    # input image dimensions
    img_rows, img_cols = 28, 28

    # the data, split between train and test sets
    (x_train, y_train), (x_test, y_test) = mnist.load_data()

    if K.image_data_format() == 'channels_first':
        x_train = x_train.reshape(x_train.shape[0], 1, img_rows, img_cols)
        x_test = x_test.reshape(x_test.shape[0], 1, img_rows, img_cols)
        input_shape = (1, img_rows, img_cols)
    else:
        x_train = x_train.reshape(x_train.shape[0], img_rows, img_cols, 1)
        x_test = x_test.reshape(x_test.shape[0], img_rows, img_cols, 1)
        input_shape = (img_rows, img_cols, 1)

    x_train = x_train.astype('float32')
    x_test = x_test.astype('float32')
    x_train /= 255
    x_test /= 255
    print('x_train shape:', x_train.shape)
    print(x_train.shape[0], 'train samples')
    print(x_test.shape[0], 'test samples')
    ans = result(x_train[0])
    print(ans)

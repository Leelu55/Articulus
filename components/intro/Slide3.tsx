import * as React from 'react';
import Svg, {SvgProps, Path, G} from 'react-native-svg';
import {View, Animated} from 'react-native';
import {useEffect, useRef} from 'react';
import {Easing} from 'react-native';

function SvgComponent(props: SvgProps) {
  const anim1 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim1, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(anim1, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ).start();
  }, [anim1]);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const flagRotate = anim1.interpolate({
    inputRange: [0, 100],
    outputRange: ['5deg', '10deg'],
  });

  return (
    <View style={{flexDirection: 'row'}}>
      <AnimatedSvg
        style={{
          transform: [
            {scaleX: -1},
            {translateY: 70},
            {translateX: -13},
            {rotate: flagRotate},
          ],
        }}
        viewBox="0 0 512 512"
        height={100}
        width={100}
        {...props}>
        <Path
          d="M440.264 247.621h53.396v-86.45H51.24v86.45h358.513a7.627 7.627 0 017.628 7.628h15.256a7.626 7.626 0 017.627-7.628z"
          fill="#ed1f34"
        />
        <Path
          d="M440.264 262.876a7.628 7.628 0 01-7.628-7.628H417.38a7.627 7.627 0 01-7.628 7.628H51.24v86.45h442.419v-86.45h-53.395z"
          fill="#ffe000"
        />
        <Path fill="#333" d="M54.324 59.465h442.417v86.454H54.324z" />
        <Path
          d="M504.371 44.209H46.696a7.628 7.628 0 00-7.628 7.628v305.117a7.628 7.628 0 007.628 7.628h457.676a7.628 7.628 0 007.629-7.628V51.836a7.629 7.629 0 00-7.63-7.627zm-7.627 15.256v86.45H54.324v-86.45h442.42zM51.24 349.326v-86.45h358.513a7.628 7.628 0 100-15.256H51.24v-86.45h442.419v86.45h-53.396a7.627 7.627 0 00-7.628 7.628 7.627 7.627 0 007.628 7.628h53.396v86.45H51.24z"
          fill="#000"
        />
        <Path
          d="M20.844 480.643c-6.391 0-11.591-5.2-11.591-11.591V42.841c0-6.332 5.152-11.484 11.484-11.484h1.514c6.392 0 11.591 5.2 11.591 11.591V469.05c0 6.392-5.2 11.591-11.591 11.591h-1.407v.002z"
          fill="#2e3033"
        />
        <Path
          d="M22.251 22.104h-1.514C9.302 22.104 0 31.407 0 42.841v426.21c0 11.494 9.351 20.844 20.844 20.844h1.406c11.494 0 20.844-9.351 20.844-20.844V42.948c.001-11.493-9.349-20.844-20.843-20.844zm5.423 446.948a5.428 5.428 0 01-5.422 5.422h-1.406a5.428 5.428 0 01-5.422-5.422V42.841a5.32 5.32 0 015.315-5.315h1.514a5.428 5.428 0 015.422 5.422v426.103h-.001z"
          fill="#000"
        />
      </AnimatedSvg>
      <Svg height={200} viewBox="0 0 512 512" width={200} {...props}>
        <Path
          d="M390.621 501.927s35.976-16.88 40.33-47.651-19.987-47.555-19.987-47.555 49.259-15.768 44.244-84.056-50.658-79.327-50.658-79.327 18.634-90.897-71.748-53.489c0 0 22.754-122.447-64.175-82.529l-23.46 219.014z"
          fill="#e8c2d8"
        />
        <Path
          d="M409.213 406.444s53.109-15.301 48.775-86.805c-.779-12.859-10.684-31.204-13.798-40.524 3.678 102.079-70.945 137.496-136.081 72.757-3.496-3.474-19.623 30.534-24.267 29.151l102.077 124.454s38.869-16.782 44.015-48.844c5.146-32.06-20.721-50.189-20.721-50.189z"
          fill="#d392d8"
        />
        <Path
          d="M419.823 403.523c-6.886-21.392-45.11-11.656-96.661 6.799-.108-.082-.215-.167-.323-.248 10.966-15.576 19.529-33.324 27.503-61.56l16.961-56.075c5.697-20.172 4.865-40.643-1.236-59.159 6.198-3.54 12.137-8.996 17.37-16.537 15.938-22.965 9.94-62.952 2.789-67.915s-46.709 3.409-62.647 26.374a68.318 68.318 0 00-1.783 2.719 101.443 101.443 0 00-24.459-10.527l-60.174-16.995a89.613 89.613 0 00-13.233-2.688c.946-5.703.916-12.089-.3-19.072-4.746-27.252-36.772-51.238-45.258-49.76s-30.519 34.877-25.774 62.129c1.57 9.017 4.664 16.432 8.802 22.21-13.991 9.021-24.728 20.19-31.114 29.06-15.412 21.406-28.938 52.71-28.938 52.71-29.747 15.484-45.772 43.641-43.805 72.625 1.622 23.914 12.436 44.166 29.861 60.372 15.315 14.244 43.448 25.745 59.755 28.857l2.503 1.206c-.452 1.501-.894 3.03-1.331 4.569-60.116-22.512-109.252-42.251-118.376-14.756-9.173 27.643 39.394 44.286 99.951 66.948L145.6 422.87c-7.177 28.706-11.582 60.901-11.544 78.957h254.221c-6.684-18-15.111-34.226-24.828-48.504 38.346-16.3 62.237-31.585 56.374-49.8z"
          fill="#faf1a9"
        />
        <Path
          d="M289.238 418.275c12.786-5.396 26.064-9.302 39.251-13.573 8.482-13.751 15.516-29.971 22.144-53.437l16.961-56.075c5.697-20.172 4.864-40.643-1.236-59.159 6.199-3.539 12.137-8.996 17.37-16.537 15.938-22.965 9.94-62.952 2.789-67.915-3.299-2.289-13.497-1.734-25.089 1.776 4.662 7.82 3.917 43.675-11.769 63.867-3.508 4.516-7.156 8.18-10.848 11.042-3.56 2.76-5.499 7.081-5.133 11.571 1.294 15.853-1 32.68-7.384 49.066l-21.572 52.862c-6.89 17.686-13.413 30.936-20.329 42.056-5.698 9.16-5.427 20.884 1 29.548 1.2 1.616 2.496 3.251 3.845 4.908zM367.097 458.455c-18.601 5.555-37.269 11.572-56.677 12.875-5.917 8.627-16.734 14.878-27.156 14.299l-147.647-3.288c-1.074 9.425-1.284 12.94-1.27 19.487h254.221c-5.899-15.886-13.168-30.371-21.471-43.373z"
          fill="#dfb5a7"
        />
        <Path
          d="M284.16 193.482c.095-.441.171-.891.205-1.357 4.351-17.042 3.518-33.148-4.88-47.89 5.255-18.956 4.565-35.116-4.824-47.342.097-22.636-2.718-47.644-7.573-74.312-.409-4.011-6.091-4.425-7.078-.516-7.585 20.492-13.389 39.896-14.192 56.239-8.702 10.934-12.463 23.428-9.601 38.045-7.775 11.36-11.791 24.356-10.035 39.767-9.993 11.401-8.968 24.803-8.997 31 1.145 21.161 62.747 25.955 66.975 6.366z"
          fill="#ccf3e2"
        />
        <Path
          d="M284.16 193.482c.095-.441.171-.891.205-1.357 3.09-12.103 3.547-23.73.555-34.736a70.076 70.076 0 01-1.788 9.89c-.026.399-.09.783-.171 1.16-3.57 16.725-57.698 12.174-58.86-5.936-.004-1.023-.044-2.278-.044-3.704-7.71 10.753-6.847 22.599-6.874 28.316 1.147 21.162 62.749 25.956 66.977 6.367z"
          fill="#b1b6e1"
        />
        <Path
          d="M132.457 168.569c15.767-3.82 29.416-13.305 39.201-26.245a47.637 47.637 0 0110.12-9.882c18.931-13.685 45.439-11.35 61.669 5.45 19.357 20.037 17.336 51.885-3.678 69.388-18.093 15.069-40.658 16.939-59.23 10.831-10.82-3.558-34.03-17.681-51.522-28.852-8.47-5.408-6.324-18.324 3.44-20.69z"
          fill="#e8c2d8"
        />
        <Path
          d="M243.446 137.892c-16.23-16.8-42.738-19.135-61.669-5.45a47.641 47.641 0 00-10.12 9.883c-9.785 12.94-23.434 22.424-39.201 26.245-9.764 2.366-11.909 15.282-3.442 20.689 17.492 11.171 40.703 25.294 51.522 28.852 18.573 6.108 41.137 4.238 59.23-10.831 21.016-17.503 23.038-49.351 3.68-69.388zm-10.582 43.738c-10.685 13.172-26.551 17.493-40.758 15.579-8.277-1.115-27.005-8.149-41.199-13.827-6.871-2.749-7.274-12.272-.642-15.255 10.709-4.817 19.052-13.407 24.111-23.957a33.52 33.52 0 015.758-8.408c11.492-12.292 30.811-14.126 44.947-4.254 16.859 11.773 20.193 34.823 7.783 50.122z"
          fill="#d392d8"
        />
        <Path
          d="M73.259 389.892c-13.034-6.134-34.183-2.425-38.338 7.123-4.155 9.549 7.387 29.557 20.595 35.304 13.21 5.748 24.3-39.342 17.743-42.427zM224.565 296.824c5.756.474 9.152 9.763 6.699 18.411-6.007 21.182-19.009 35.695-32.811 34.558-13.803-1.137-24.253-17.583-26.712-39.463-1.004-8.933 3.867-17.54 9.623-17.066z"
          fill="#d789b9"
        />
        <Path
          d="M224.565 296.824l-43.201-3.56c-5.756-.474-10.627 8.134-9.623 17.066 2.459 21.88 12.909 38.326 26.712 39.463a18.72 18.72 0 005.468-.368c-6.628-2.496-12.417-8.59-13.63-19.384-.633-5.637 4.875-15.299 8.507-15l27.26 2.247c1.53.126 2.79 1.245 3.627 2.899a81.903 81.903 0 001.579-4.951c2.453-8.649-.943-17.938-6.699-18.412z"
          fill="#c668b9"
        />
        <Path
          d="M376.522 395.551c13.034-6.134 34.183-2.425 38.338 7.124 4.155 9.548-7.387 29.556-20.595 35.304-13.209 5.747-24.3-39.343-17.743-42.428z"
          fill="#d789b9"
        />

        <G>
          <G fill="#3c122c">
            <Path d="M7.105 381.619a6.043 6.043 0 01-5.126-9.235c13.147-21.147 30.363-22.568 31.089-22.617 3.333-.24 6.216 2.283 6.444 5.612a6.041 6.041 0 01-5.542 6.439c-.627.064-12.086 1.438-21.727 16.947a6.04 6.04 0 01-5.138 2.854zM200.024 355.901c-.687 0-1.376-.029-2.067-.086-14.129-1.163-25.494-14.014-30.4-34.374-2.354-9.765.022-20.946 5.911-27.823 3.648-4.258 8.302-6.386 13.1-5.99l33.786 2.784c4.801.395 9.042 3.255 11.943 8.052 4.683 7.748 5.198 19.167 1.277 28.416-7.773 18.339-20.198 29.021-33.55 29.021zm-14.57-56.233c-1.13 0-2.332 1.257-2.807 1.812-2.897 3.383-4.976 10.353-3.342 17.129 3.571 14.817 11.098 24.458 19.644 25.162 8.525.7 17.551-7.575 23.497-21.607 2.72-6.418 1.812-13.634-.493-17.445-.391-.647-1.428-2.165-2.594-2.261l-33.785-2.784a1.19 1.19 0 00-.12-.006z" />

            <Path
              d="M442.317 397.186c12.04-12.855 25.793-36.346 22.936-75.258-4.166-56.721-34.357-77.949-49.62-85.117 1.266-12.79 1.439-36.952-12.19-52.393.182-3.286.187-6.238.115-8.682-.194-6.5-1.6-28.249-11.589-35.181-9.987-6.93-30.854-.64-37.012 1.453-2.735.929-6.1 2.213-9.765 3.898-1.458-18.325-6.668-37.547-20.518-48.34-10.419-8.12-23.822-10.29-39.99-6.533-.333-20.573-2.837-43.538-7.64-69.986A13.65 13.65 0 00264.5 9.308a13.647 13.647 0 00-14.064 9.611c-8.755 23.705-13.28 41.095-14.465 55.709-6.853 9.506-10.43 19.8-10.734 30.741-5.167-8.651-11.469-15.46-15.88-19.669-4.664-4.452-20.826-18.819-32.712-16.742-11.902 2.073-22.242 21.048-25.128 26.814-4.715 9.422-12.134 28.052-8.84 46.964.858 4.932 2.135 9.549 3.811 13.829-4.882 2.749-10.075 4.829-15.453 6.133h.001c-6.908 1.673-11.926 7.066-13.095 14.076-.73 4.373.162 8.637 2.389 12.157-12.349 17.86-23.023 40.508-26.793 48.841-30.688 17.341-48.255 47.893-46.041 80.524 1.486 21.884 9.778 41.469 24.637 58.389-15.19-3.108-27.761-3.271-37.163 1.22-6.998 3.343-12.037 9.148-14.573 16.787-3.085 9.298-1.74 18.618 3.89 26.953 4.428 6.554 11.59 12.705 21.895 18.802 17.727 10.489 42.898 19.88 72.043 30.753l7.74 2.89c-1.309 10.892-1.994 20.532-1.978 27.761.012 5.555 4.518 10.049 10.07 10.049h.023c5.562-.012 10.061-4.53 10.049-10.093-.042-19.75 5.624-59.134 15.178-90.853a10.07 10.07 0 00-5.273-11.977l-2.503-1.206a9.982 9.982 0 00-2.483-.819c-13.96-2.664-40.765-13.3-54.784-26.34-16.311-15.171-25.284-33.231-26.671-53.679-1.74-25.628 12.977-49.773 38.407-63.01a10.074 10.074 0 004.594-4.937c.126-.29 12.092-27.81 25.835-47.916 20.19 12.54 34.38 20.203 42.222 22.782 7.265 2.389 14.689 3.56 22.013 3.56 15.604-.001 30.758-5.316 42.972-15.488.326-.271.634-.559.953-.837a81.5 81.5 0 005.009.565c2.078.165 4.217.253 6.376.253 15.029 0 30.994-4.286 33.996-16.758.017-.061.031-.121.046-.182.016-.07.037-.136.052-.207.007-.031.009-.062.015-.093.022-.111.04-.221.055-.332.076-.395.154-.791.197-1.164 1.425-5.695 2.268-11.222 2.533-16.571l1.733.489a91.533 91.533 0 0122.034 9.482c4.703 2.811 10.791 1.34 13.698-3.303a55.937 55.937 0 011.522-2.321c11.637-16.768 39.604-24.163 48.371-23.469 3.733 7.965 6.576 36.757-5.062 53.526-4.185 6.031-8.925 10.584-14.09 13.533a10.072 10.072 0 00-4.571 11.897c5.681 17.244 6.072 35.633 1.133 53.184L340.704 345.6c-.018.059-.034.118-.051.178-6.769 23.965-14.172 40.986-24.495 56.235a6560.525 6560.525 0 00-11.054 4.14l-8.151 3.057c-5.21 1.949-7.852 7.752-5.902 12.962 1.948 5.208 7.752 7.853 12.962 5.902l8.17-3.064c18.908-7.098 38.119-14.304 54.535-19.128l12.069 30.451c-14.865 6.949-33.519 13.914-54.267 21.654l-8.171 3.052c-5.21 1.949-7.852 7.752-5.902 12.962a10.074 10.074 0 009.433 6.544c1.173 0 2.366-.207 3.529-.642l8.151-3.044c9.926-3.703 19.375-7.232 28.242-10.693 7.409 11.972 13.805 25.081 19.037 39.169a10.075 10.075 0 009.442 6.568c.26 0 .522-.014.783-.034a9.99 9.99 0 001.566.133 10.03 10.03 0 004.271-.956c1.67-.784 40.964-19.604 46.023-55.357 2.631-18.595-3.391-32.884-10.095-42.54a28.92 28.92 0 00.039-5.87 79.895 79.895 0 0011.449-10.093zm-306.085 21.651c-2.92 11.469-5.379 23.421-7.308 34.857l-3.66-1.367c-28.245-10.537-52.64-19.639-68.826-29.216-20.27-11.993-17.926-19.059-16.924-22.075.823-2.482 2.06-3.965 4.137-4.956 13.898-6.638 53.734 8.176 92.581 22.757zm119.572-339.31c.024-.198.048-.396.06-.595.003-.045.011-.089.014-.135.437-8.903 2.627-18.988 5.392-28.679 1.703 12.764 2.741 24.574 3.137 35.609l-8.617-6.048c.006-.051.008-.102.014-.152zm-5.976 10.734l15.804 11.093c.019.038.043.075.062.113.08.157.166.31.254.462.077.132.153.264.237.393.1.156.206.306.315.456.059.082.11.168.172.249 5.088 6.625 5.763 15.137 2.12 28.666l-22.522-15.702a10.16 10.16 0 00-.17-1.578c-1.733-8.85-.542-16.665 3.728-24.152zm-69.648-1c6.359 2.388 20.994 13.948 28.821 28.264-10.767.078-21.559 3.364-30.763 10.019a53.74 53.74 0 00-11.401 11.134 69.118 69.118 0 01-3.534 4.299 56.6 56.6 0 01-.782-3.698c-3.445-19.779 10.997-44.361 17.659-50.018zm70.538 83.847c-.62 11.439-6.02 22.202-14.818 29.529-14.723 12.263-34.715 15.901-53.476 9.734-7.967-2.621-25.781-12.637-50.157-28.205-2.775-1.772-2.544-4.584-2.407-5.404.136-.818.829-3.547 4.02-4.32 16.634-4.031 31.762-14.143 42.597-28.473a41.675 41.675 0 018.84-8.63c7.205-5.208 15.667-7.755 24.094-7.755 10.885 0 21.714 4.252 29.688 12.507 8.121 8.405 12.246 19.42 11.619 31.017zm3.619 26.688a53.746 53.746 0 006.432-14.201l15.088 9.724c-3.774 2.741-11.609 4.726-21.52 4.477zm25.644-16.196l-17.161-11.06c.465-14.539-4.834-28.294-15.029-38.847a52.55 52.55 0 00-9.204-7.579c.26-.065.523-.124.774-.207l35.826 24.976c.39.272.806.475 1.23.643 4.347 9.604 5.521 20.186 3.564 32.074zm38.877-18.717a112.015 112.015 0 00-18.783-7.181l-9.558-2.699a61.788 61.788 0 00-4.402-11.189c.178-.385.34-.781.471-1.197 3.046-9.67 5.724-21.071 4.167-32.32 9.19-1.876 16.406-.841 21.531 3.148 10.29 8.009 13.087 27.365 13.084 44.958a62.486 62.486 0 00-6.51 6.48zm41.151 186.461l16.934-55.99a5.2 5.2 0 00.051-.178c5.36-18.975 5.611-38.763.789-57.679 5.11-4.003 9.775-9.028 13.929-15.012a56.015 56.015 0 003.788-6.333c1.296 9.866.206 20.088-.815 25.163-1.09 5.314 2.136 10.514 7.409 11.789 1.579.413 38.701 10.801 43.071 70.298 2.665 36.288-11.403 55.6-23.024 65.232a27.644 27.644 0 00-7.327-5.072c-15.431-7.371-39.388-2.218-69.486 7.957 5.55-11.572 10.265-24.555 14.681-40.175zm18.465 51.402c12.251-2.868 22.062-3.682 27.658-1.008 2.076.991 3.313 2.474 4.137 4.955 1.001 3.017 3.346 10.083-16.924 22.076a131.48 131.48 0 01-3.721 2.108zm42.505 50.118c-2.42 17.104-17.724 29.495-27.169 35.623-4.435-10.569-9.501-20.6-15.138-30.034 9.367-4.051 17.765-8.111 24.929-12.35 6.43-3.804 11.637-7.63 15.719-11.561 1.766 5.156 2.656 11.278 1.659 18.322z"
              fill="#000"
            />
            <Path
              d="M166.129 265.156a6.042 6.042 0 01-5.963-7.061c.287-1.681-.097-3.372-1.083-4.764s-2.454-2.316-4.135-2.603a6.35 6.35 0 00-4.766 1.083 6.339 6.339 0 00-2.603 4.135 6.037 6.037 0 01-6.973 4.939 6.041 6.041 0 01-4.939-6.973c1.714-10.038 11.273-16.811 21.316-15.096a18.348 18.348 0 0111.964 7.532 18.34 18.34 0 013.132 13.784 6.046 6.046 0 01-5.95 5.024zM290.39 286.382a6.041 6.041 0 01-5.963-7.06 6.344 6.344 0 00-1.083-4.766 6.343 6.343 0 00-4.135-2.602 6.354 6.354 0 00-4.766 1.083 6.339 6.339 0 00-2.603 4.135c-.562 3.289-3.679 5.508-6.973 4.939a6.041 6.041 0 01-4.939-6.973 18.343 18.343 0 017.532-11.963 18.341 18.341 0 0113.785-3.133 18.342 18.342 0 0111.962 7.531 18.346 18.346 0 013.133 13.784 6.046 6.046 0 01-5.95 5.025z"
              fill="#000"
            />
          </G>
          <Path
            d="M189.131 169.966c-2.438 0-4.882-.88-6.818-2.661-4.092-3.767-4.356-10.138-.589-14.23 13.87-15.067 29.609-15.325 31.358-15.271 0 0 10.623-.371 10.476 9.331s-10.569 10.81-10.569 10.81c-.349.009-8.653.306-16.446 8.772a10.045 10.045 0 01-7.412 3.249z"
            fill="#fff"
          />
        </G>
      </Svg>
    </View>
  );
}

export default SvgComponent;

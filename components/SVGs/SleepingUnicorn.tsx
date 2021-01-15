import * as React from 'react';
import Svg, {SvgProps, Path, G, Circle} from 'react-native-svg';

function SleepingUnicorn(props: SvgProps) {
  return (
    <Svg height={70} viewBox="0 0 512 512" width={70} {...props}>
      <Path
        d="M317.96 403.892s82.934-.813 90.981-65.472c7.397-59.434-55.024-62.415-55.024-62.415s5.131-80.905-70.525-37.484c0 0 4.825-108.699-67.446-63.53l6.698 192.313z"
        fill="#c2b2eb"
      />
      <Path
        d="M374.875 387.631s39.8-23.281 26.748-81.734c-2.347-10.512-12.954-24.344-16.76-31.625 12.41 62.782-16.366 99.655-57.912 96.589-4.113-.304-8.179 30.593 4.017 31.406 14.806.986 43.907-14.636 43.907-14.636z"
        fill="#ae85ea"
      />
      <Path
        d="M397.703 282.323c3.19 6.17 5.557 12.781 7.122 19.536 5.83 25.171.538 50.985-15.405 71.418-15.492 19.857-39.041 29.973-63.838 31.231-2.019.103-4.511-1.631-4.845-3.689a33.823 33.823 0 01-.344-3.148c2.62-9.042 4.402-18.868 5.257-30.858.11-.599.219-1.198.313-1.801 2.109-13.491 1.15-27.817.852-41.42l-.058-2.562.387-20.944c0-17.526-5.322-33.808-14.439-47.319 4.183-4.257 7.721-9.997 10.218-17.253 7.605-22.1-6.308-52.911-13.19-55.279s-36.808 13.357-44.413 35.457c-.3.874-.566 1.736-.817 2.592a84.782 84.782 0 00-22.072-2.911h-52.278c-3.904 0-7.655.297-11.259.844-.535-4.804-2.011-9.935-4.576-15.277-10.011-20.849-41.231-32.871-47.723-29.753s-16.63 34.998-6.619 55.847c3.312 6.898 7.487 12.162 12.13 15.87-9.207 10.438-15.308 21.865-18.431 30.453-7.536 20.726-11.305 48.987-11.305 48.987-20.416 19.219-26.911 45.517-18.742 68.39 6.741 18.873 20.044 32.71 37.746 41.79 5.312 2.724 11.753 4.851 18.484 6.425h-14.246c-15.937 0-28.855 12.919-28.855 28.855v5.289c0 15.936 12.919 28.855 28.855 28.855h52.341c8.514 0 16.166-3.69 21.447-9.555a63.173 63.173 0 0032.924 9.24h2.294c1.39.206 2.812.315 4.259.315h52.341c1.448 0 2.869-.109 4.259-.315h82.283c1.501.202 3.03.315 4.586.315h38.78c3.212 0 6.317-.453 9.265-1.282 18.287-3.22 34.503-14.359 43.673-30.896 10.176-18.351 15.877-38.887 15.877-60.575-.003-55.762-37.629-103.964-92.238-126.872z"
        fill="#fff"
      />
      <Path
        d="M320.688 395.919c5.318-15.068 5.552-22.246 5.552-46.86l.903-48.973c0-17.526-5.322-33.808-14.438-47.319 4.183-4.257 7.721-9.997 10.218-17.253 7.605-22.1-6.308-52.911-13.19-55.279-3.247-1.118-4.174-.415-12.918 5.295 5.417 10.165 9.137 23.249 7.766 39.694-.863 10.355-14.254 21.311-17.757 25.362 7.633 12.855 13.476 56.1 13.476 72.775l-.229 12.434c0 17.067-4.679 31.192-8.644 47.095-2.312 9.274-3.604 17.608 3.328 24.189 9.321 8.848 23.476 1.373 25.933-11.16z"
        fill="#e1bdfc"
      />
      <Path
        d="M239.387 229.465a8.165 8.165 0 00-.155-1.137c-.529-14.696-4.995-27.419-15.208-37.264-.254-16.445-4.618-29.244-15.033-36.838-5.26-18.181-13.415-37.577-23.598-57.823-1.273-3.121-5.93-2.113-5.799 1.255-1.252 18.226-1.333 35.159 1.877 48.459-4.402 10.822-4.473 21.731 1.27 32.782-3.559 10.946-3.715 22.318 1.327 34.265-5.327 11.502-1.345 22.01.093 26.988 5.909 16.704 56.453 6.023 55.226-10.687z"
        fill="#c1e5ef"
      />
      <Path
        d="M239.387 229.465a8.165 8.165 0 00-.155-1.137c-.376-10.437-2.751-19.871-7.746-27.994a58.52 58.52 0 01.897 8.355c.073.326.112.649.137.97 1.08 14.257-43.412 23.371-48.614 9.118-.244-.82-.572-1.817-.908-2.961-3.649 10.443-.164 19.743 1.163 24.335 5.909 16.705 56.453 6.024 55.226-10.686z"
        fill="#a6aaed"
      />
      <Path
        d="M111.824 245.253c11.746-6.783 20.459-17.609 25.256-30.296a39.837 39.837 0 015.787-10.314c11.958-15.441 33.772-19.819 50.753-10.17 20.252 11.508 26.141 37.532 13.411 56.527-10.96 16.354-28.619 23.175-44.958 22.654-9.518-.303-31.467-6.159-48.132-10.995-8.067-2.339-9.392-13.205-2.117-17.406z"
        fill="#c2b2eb"
      />
      <Path
        d="M193.62 194.474c-16.98-9.648-38.794-5.271-50.753 10.17a39.837 39.837 0 00-5.787 10.314c-4.798 12.687-13.51 23.513-25.256 30.296-7.274 4.2-5.95 15.067 2.118 17.408 16.665 4.836 38.614 10.691 48.132 10.995 16.338.52 33.998-6.301 44.958-22.655 12.729-18.996 6.84-45.02-13.412-56.528zm1.825 37.58c-5.465 13.085-17.173 20.292-29.02 22.107-6.902 1.057-23.583-.169-36.308-1.376-6.159-.585-8.729-8.128-4.113-12.085 7.454-6.389 12.121-15.247 13.692-24.902a28.024 28.024 0 012.636-8.102c6.32-12.57 21.384-18.597 35.051-14.011 16.3 5.467 24.409 23.17 18.062 38.369z"
        fill="#ae85ea"
      />
      <Path
        d="M155.234 234.984c-1.493 0-3.007-.334-4.437-1.039-4.978-2.455-7.023-8.48-4.569-13.458 7.885-15.991 21.096-20.08 22.576-20.494 0 0 9.613-3.632 12.756 5.685 3.324 9.854-7.275 13.657-7.139 13.612-.253.084-6.25 2.144-10.167 10.086a10.048 10.048 0 01-9.02 5.608z"
        fill="#fff"
      />
      <G fill="#9781dd">
        <Path d="M245.174 501.95h6.106c2.955 0 5.35-2.147 5.35-4.794v-53.412c0-2.648-2.395-4.794-5.35-4.794h-6.106c-19.415 0-35.154 14.103-35.154 31.5s15.739 31.5 35.154 31.5zM382.397 501.95h5.942a5.206 5.206 0 005.206-5.206v-58.001a5.206 5.206 0 00-5.206-5.206h-5.942c-18.892 0-34.206 15.315-34.206 34.207 0 18.891 15.314 34.206 34.206 34.206zM171.654 438.95h-6.106c-2.955 0-5.35 2.146-5.35 4.794v53.412c0 2.648 2.396 4.794 5.35 4.794h6.106c19.415 0 35.154-14.103 35.154-31.5s-15.739-31.5-35.154-31.5z" />
      </G>
      <Path
        d="M166.019 495.304l39.301.982c-.557-8.869-1.08-17.739-1.302-26.622l-38.631 9.266c.042 5.467.315 10.921.632 16.374z"
        fill="#8962de"
      />
      <Path
        d="M155.373 481.333l-51.747 12.412 52.328 1.307c-.264-4.57-.492-9.141-.581-13.719z"
        fill="#e1bdfc"
      />
      <Path
        d="M251.147 469.37H214.06c.22 9.066.757 18.117 1.326 27.167l35.761.894z"
        fill="#8962de"
      />
      <Path
        d="M344.158 469.37h-82.961v28.312l91.545 2.287c-3.378-10.052-6.395-20.228-8.584-30.599z"
        fill="#e1bdfc"
      />
      <Path
        d="M381.689 469.37H354.43c2.356 10.457 5.518 20.72 9 30.866l24.593.614v-31.74c-2.204.171-4.33.26-6.334.26z"
        fill="#8962de"
      />
      <Path
        d="M414.161 290.297a156.339 156.339 0 00-3.622 9.181c21.677 22.989 37.05 53.65 39.546 82.632 1.678 19.486-1.371 45.004-9.505 60.885-7.102 13.867-25.584 21.697-42.507 24.798v33.309l21.312.533c22.633 0 43.7-12.069 54.676-31.863 10.176-18.351 15.877-38.887 15.877-60.575 0-49.961-30.217-93.832-75.777-118.9z"
        fill="#e1bdfc"
      />
      <Path
        d="M469.927 137.738l8.256 23.213c.353.994 1.053 1.781 1.936 2.179l20.624 9.292c2.914 1.313 2.914 5.955 0 7.268l-20.624 9.292c-.883.398-1.583 1.185-1.936 2.179l-8.256 23.213c-1.166 3.279-5.291 3.279-6.457 0l-8.255-23.213c-.354-.994-1.053-1.781-1.936-2.179l-20.624-9.292c-2.914-1.313-2.914-5.955 0-7.268l20.624-9.292c.883-.398 1.583-1.185 1.936-2.179l8.255-23.213c1.166-3.28 5.29-3.28 6.457 0zM324.553 68.397l6.124 17.219c.262.737.781 1.321 1.436 1.617l15.299 6.893c2.161.974 2.161 4.417 0 5.391l-15.299 6.893c-.655.295-1.174.879-1.436 1.617l-6.124 17.219c-.865 2.433-3.925 2.433-4.79 0l-6.124-17.219c-.262-.737-.781-1.322-1.436-1.617l-15.298-6.893c-2.161-.974-2.161-4.417 0-5.391l15.298-6.893c.655-.295 1.174-.879 1.436-1.617l6.124-17.219c.866-2.433 3.925-2.433 4.79 0z"
        fill="#c1e5ef"
      />
      <Circle
        cx={423.344}
        cy={72.828}
        fill="#96b4eb"
        transform="rotate(-13.34 422.77 73.143)"
        r={12.248}
      />
      <Path
        d="M258.101 40.981c0 5.254-4.259 9.513-9.513 9.513s-9.513-4.259-9.513-9.513a9.513 9.513 0 1119.026 0z"
        fill="#96b4eb"
      />
      <G fill="#3c122c">
        <Path d="M448.431 301.81c-22.531-19.374-50.127-32.739-80.17-39.231-1.62-11.893-6.86-32.172-23.797-41.996-2.96-1.717-6.116-3.002-9.443-3.899-.517-7.778-2.234-14.652-3.674-19.227-2.167-6.883-8.293-23.267-18.343-26.725-9.381-3.232-23.011 4.533-29.613 8.907-4.104-8.582-9.84-16.079-17.854-20.757-11.168-6.519-24.543-6.578-39.885-.251-1.913-3.7-4.48-7.173-7.909-10.235-5.157-16.978-12.78-35.427-23.253-56.275a13.046 13.046 0 00-14.648-7.348 13.041 13.041 0 00-10.298 12.553c-1.423 20.956-.966 35.985 1.481 48.059-4.376 12.742-3.592 25.229 2.324 37.178-6.76-6.937-14.441-11.688-19.511-14.371-6.326-3.348-22.069-10.636-31.594-6.066-9.525 4.574-13.676 21.419-15.019 28.448-1.69 8.85-3.459 25.919 3.691 40.81a63.111 63.111 0 002.883 5.321 48.496 48.496 0 01-4.991 3.324c-5.491 3.171-8.429 9.05-7.666 15.343.471 3.888 2.277 7.282 5.022 9.729a84.933 84.933 0 00-1.936 4.821c-6.314 17.365-10.035 39.222-11.318 47.623-20.91 21.342-28.104 50.371-18.748 76.569 5.915 16.561 16.732 30.462 31.6 40.76-11.393 6.721-19.058 19.117-19.058 33.275v5.235c0 21.292 17.323 38.614 38.614 38.614h52.924c8.462 0 16.292-2.744 22.662-7.378a73.215 73.215 0 0031.417 7.062h187.062c5.268 0 10.448-.571 15.471-1.651a61.212 61.212 0 0016.663-5.755c13.063-6.372 24.099-16.588 31.332-29.633 11.372-20.506 17.138-42.527 17.138-65.449.001-40.659-18.309-78.796-51.556-107.384zm-99.548-30.053c-.008 4.961 3.653 9.193 8.555 9.953.234.036 23.625 3.868 35.578 23.175 11.854 19.149 1.104 48.923-3.936 57.029-6.767 10.888-16.793 19.234-29.799 24.809-7.657 3.281-18.808 5.46-27.414 6.767 3.048-12.982 4.416-27.003 4.421-44.336l.901-48.883.002-.185c0-16.42-4.187-32.344-12.17-46.49 3.017-4.315 5.495-9.271 7.403-14.812.179-.521.322-1.045.482-1.567.484.224.962.46 1.425.727 11.853 6.828 14.523 26.743 14.552 33.813zm-93.489-95.522c5.413 3.153 9.266 9.544 11.983 17.157-3.402 3.806-6.639 8.232-9.134 13.252a95.203 95.203 0 00-15.812-1.32h-1.751c-2.378-5.909-5.654-11.21-9.839-15.856.068-.441.118-.887.127-1.345.06-3.129.024-6.433-.232-9.795 10.383-4.858 18.662-5.585 24.658-2.093zm-34.668 21.743h.033l1.076.36c.323.108.649.186.974.238 5.183 6.141 8.396 13.602 9.73 22.585l-14.403-4.244c-2.965-10.894-9.675-20.076-19.148-26.223l16.028 5.363a10.003 10.003 0 005.71 1.921zm-.986 31.984l11.682 3.442c-2.34 2.294-6.753 4.877-13.083 6.761a45.941 45.941 0 001.401-10.203zm-23.949-84.098l-4.434-1.499a9.868 9.868 0 00-.093-.479c-.01-.043-.014-.085-.024-.127-1.127-4.671-1.777-9.93-2.109-15.346a294.845 294.845 0 016.66 17.451zm-6.942 10.383l12.197 4.124a10.237 10.237 0 002.024 1.975c4.929 3.594 7.295 9.456 7.738 19.584l-18.543-6.205a10.104 10.104 0 00-.607-1.462c-3.097-5.959-4.027-11.804-2.809-18.016zm-57.592 24.65c4.282.714 12.182 3.87 19.518 8.879a45.043 45.043 0 00-12.675 11.176 45.954 45.954 0 00-6.66 11.873 56.214 56.214 0 01-3.437 7.391c-5.03-13.761-.36-32.86 3.254-39.319zm-16.418 69.578c12.587-7.268 22.489-19.124 27.881-33.384a33.858 33.858 0 014.915-8.755c10.133-13.086 28.622-16.793 43.006-8.619 8.256 4.691 13.996 12.332 16.164 21.515a33.683 33.683 0 01-4.784 26.412c-8.731 13.029-23.598 20.501-39.757 19.984-6.927-.22-23.492-4.041-46.642-10.758-2.011-.583-2.423-2.255-2.507-2.946-.084-.69-.083-2.405 1.724-3.449zm-8.033 222.911v-5.235c0-10.208 8.305-18.514 18.514-18.514h29.341V491.9H125.32c-10.209 0-18.514-8.305-18.514-18.514zm59.915 18.514v-42.263h11.523c10.208 0 18.513 8.305 18.513 18.514v5.235c0 10.209-8.305 18.514-18.513 18.514zm71.864-.637c-10.209 0-18.514-8.305-18.514-18.514v-5.235c0-10.208 8.305-18.514 18.514-18.514h11.523v42.263zm119.656-23.866c0-13.129 10.681-23.81 23.811-23.81h4.984v47.621h-4.984c-13.13 0-23.811-10.682-23.811-23.811zm107.031-2.499c-8.858 15.666-25.695 26.34-43.856 26.31h-22.321v-47.621h1.254c5.55 0 10.05-4.499 10.05-10.05s-4.5-10.05-10.05-10.05h-18.298c-24.212 0-43.911 19.698-43.911 43.91a43.64 43.64 0 007.287 24.187h-20.229a38.364 38.364 0 004.924-18.835c0-5.551-4.5-10.05-10.05-10.05s-10.05 4.499-10.05 10.05c0 10.208-8.305 18.514-18.514 18.514h-29.34V449h29.34c5.55 0 10.05-4.5 10.05-10.05 0-5.551-4.5-10.05-10.05-10.05h-52.923c-12.345 0-23.348 5.83-30.421 14.874-7.087-8.681-17.865-14.237-29.919-14.237h-34.438c-6.522-1.41-12.808-3.37-17.845-5.954-16.191-8.305-27.25-20.494-32.869-36.228-7.003-19.606-.808-41.713 16.165-57.692a10.056 10.056 0 003.073-5.987c.036-.272 3.725-27.456 10.788-46.883a69.336 69.336 0 011.945-4.734c17.812 4.849 30.172 7.411 36.817 7.623a61.08 61.08 0 001.959.031c19.586 0 37.495-9.382 48.2-25.355.12-.179.228-.365.345-.546a64.6 64.6 0 003.762-.667c13.937-2.922 29.84-10.869 29.266-23.688-.091-1.332-.247-2.658-.303-3.983a74.796 74.796 0 0116.78 2.514c5.278 1.422 10.726-1.638 12.259-6.887.207-.708.425-1.42.673-2.139 5.083-14.772 23.801-26.402 31.411-28.56 4.671 6.384 12.268 27.069 7.186 41.84-1.919 5.574-4.572 10.109-7.884 13.48a10.05 10.05 0 00-1.163 12.665c8.304 12.309 12.702 26.696 12.72 41.609l-.901 48.877-.002.185c0 21.727-2.279 37.455-7.62 52.59-1.847 5.234.898 10.975 6.132 12.822 2.057.698 4.107.645 6.208.632 1.188-.103 29.274-2.612 46.291-9.905 16.863-7.227 29.969-18.221 38.951-32.672 7.49-12.047 18.446-44.699 7.731-70.784 39.871 23.703 66.005 63.025 66.005 107.455.001 19.472-4.916 38.213-14.615 55.702z" />
        <Path d="M136.262 333.509a6.032 6.032 0 01-.646-12.025l20.154-2.198c3.304-.357 6.288 2.03 6.648 5.341a6.03 6.03 0 01-5.341 6.648l-20.154 2.198a6.128 6.128 0 01-.661.036zM264.37 333.509c-.219 0-.44-.012-.661-.036l-20.154-2.198a6.03 6.03 0 01-5.341-6.648c.361-3.311 3.356-5.698 6.648-5.341l20.154 2.198a6.03 6.03 0 01-.646 12.025zM68.698 217.861H42.487a10.05 10.05 0 01-8.42-15.536l15.477-23.755h-6.252c-5.55 0-10.05-4.499-10.05-10.05s4.5-10.05 10.05-10.05h24.795a10.05 10.05 0 018.42 15.536L61.03 197.762h7.668c5.55 0 10.05 4.499 10.05 10.05 0 5.55-4.5 10.049-10.05 10.049zM119.099 136.632H88.261a10.05 10.05 0 01-8.42-15.537l19.996-30.69H89.209c-5.55 0-10.05-4.499-10.05-10.05 0-5.55 4.5-10.05 10.05-10.05h29.172a10.05 10.05 0 018.421 15.537l-19.997 30.69H119.1c5.55 0 10.05 4.499 10.05 10.05-.001 5.55-4.501 10.05-10.051 10.05zM55.942 75.293h-36.82a10.05 10.05 0 01-8.42-15.537L36.541 20.1H20.255c-5.55 0-10.05-4.499-10.05-10.05S14.705 0 20.255 0h34.83a10.05 10.05 0 018.42 15.536L37.666 55.193h18.277c5.55 0 10.05 4.5 10.05 10.05-.001 5.55-4.501 10.05-10.051 10.05zM194.596 375.879c-10.097 0-18.311-8.696-18.311-19.384a6.03 6.03 0 0112.06 0c0 4.039 2.804 7.324 6.251 7.324s6.252-3.285 6.252-7.324a6.03 6.03 0 0112.06 0c0 10.688-8.215 19.384-18.312 19.384z" />
      </G>
    </Svg>
  );
}

export default SleepingUnicorn;

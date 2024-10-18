import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function RobaLogo(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="linearRGB"
          >
            <feMorphology
              operator="dilate"
              radius="20 20"
              in="SourceAlpha"
              result="morphology"
            />
            <feFlood floodColor="#ffffff" floodOpacity="1" result="flood" />
            <feComposite
              in="flood"
              in2="morphology"
              operator="in"
              result="composite"
            />
            <feMerge result="merge">
              <feMergeNode in="composite" result="mergeNode" />
              <feMergeNode in="SourceGraphic" result="mergeNode1" />
            </feMerge>
          </filter>
        </defs>
        <g id="notion-avatar" filter="url(#filter)">
          <g id="notion-avatar-face" fill="#ffffff">
            <title>Face/ 14</title>
            <desc>Created with Sketch.</desc>
            <g
              id="Face/-14"
              stroke="none"
              strokeWidth="1"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M532,379 C664.54834,379 772,486.45166 772,619 C772,642.160109 783.234546,656.244677 777.453024,678.979248 C763.583554,733.517917 758.701879,941.343666 598,909 C539.618945,897.249936 461,880 433,858 C405,836 342.170039,758.772836 320.189513,718.584987 C317.498129,718.859681 314.765451,719 312,719 C267.81722,719 232,683.18278 232,639 C232,599.134956 261.158843,566.080325 299.312086,560.00055 C325.599297,455.979213 419.809919,379 532,379 Z M295.858895,624.545187 L304.141105,655.454813"
                id="Path"
                stroke="#000000"
                strokeWidth="24"
              />
            </g>
          </g>
          <g id="notion-avatar-nose">
            <title>Nose/ 9</title>
            <g
              id="Nose/-9"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M631,694.380659 C663.848549,704.811956 684.630284,697.576454 693.345205,672.674154 C706.417587,635.320703 637.033407,606.392531 660.161467,579"
                id="Path"
                stroke="#000000"
                strokeWidth="16"
              />
            </g>
          </g>
          <g id="notion-avatar-mouth">
            <title>Mouth/ 1</title>
            <g
              id="Mouth/-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M549,759 C575.12979,773.666667 603.12979,781 633,781 C662.87021,781 682.87021,773.666667 693,759"
                id="Path"
                stroke="#000000"
                strokeWidth="16"
              />
            </g>
          </g>
          <g id="notion-avatar-eyes">
            <title>Eyes/ 10</title>
            <g
              id="Eyes/-10"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Group" transform="translate(520.000000, 512.000000)">
                <g transform="translate(140.000000, 0.000000)">
                  <circle id="Oval" fill="#000000" cx="52" cy="28" r="24" />
                  <path
                    d="M1,16 C24.2727273,8 41.7272727,4 53.3636364,4 C65,4 79.5454545,8 97,16"
                    id="Path"
                    stroke="#000000"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(49.000000, 10.000000) rotate(-4.000000) translate(-49.000000, -10.000000) "
                  />
                </g>
                <g>
                  <circle
                    id="Oval"
                    fill="#000000"
                    transform="translate(46.000000, 28.000000) scale(-1, 1) translate(-46.000000, -28.000000) "
                    cx="46"
                    cy="28"
                    r="24"
                  />
                  <path
                    d="M1,16 C24.2727273,8 41.7272727,4 53.3636364,4 C65,4 79.5454545,8 97,16"
                    id="Path"
                    stroke="#000000"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(49.000000, 10.000000) scale(-1, 1) rotate(-4.000000) translate(-49.000000, -10.000000) "
                  />
                </g>
              </g>
            </g>
          </g>
          <g id="notion-avatar-eyebrows">
            <title>Eyebrows/ 6</title>
            <g
              id="Eyebrows/-6"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M620,495.140162 C589.850248,491.823271 565.234864,491.823271 546.153846,495.140162 C527.072829,498.457053 511.688213,505.410333 500,516 C517.257672,497.488903 532.642287,487.058984 546.153846,484.710243 C559.665405,482.361502 584.280789,485.838142 620,495.140162 Z M658,495.140162 C693.719211,485.838142 718.334595,482.361502 731.846154,484.710243 C745.357713,487.058984 760.742328,497.488903 778,516 C766.311787,505.410333 750.927171,498.457053 731.846154,495.140162 C712.765136,491.823271 688.149752,491.823271 658,495.140162 Z"
                id="Combined-Shape"
                stroke="#000000"
                strokeWidth="8"
                fill="#000000"
              />
            </g>
          </g>
          <g id="notion-avatar-glasses">
            <title>Glasses/ 0</title>
            <g
              id="Glasses/-0"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            />
          </g>
          <g id="notion-avatar-hair">
            <title>Hairstyle/ 8</title>
            <g
              id="Hairstyle/-8"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M589.5,149 C631.429764,149 667.646435,173.46066 684.658775,208.890741 C721.09813,214.498985 749,245.991077 749,284 C749,286.479516 748.88126,288.931299 748.649157,291.349973 C776.884031,307.885612 799.44561,330.956745 794,360 C786,402.666667 760.666667,438 718,466 L715.0861,463.567 C683.962033,437.635667 661.933333,421.113333 649,414 C615.112376,395.361807 560.361457,389 532,389 C494.328727,389 459.328727,395.666667 427,409 C427.442658,419.124205 429.109325,429.457538 432,440 C434.890675,450.542462 438.890675,460.875795 444,471 C418.42303,487.163731 403.86212,499.704664 400.317272,508.622798 C395.053173,521.866228 390.816933,592.760589 386.449154,651.362106 L386.17725,655 L366.146153,655 L328.203914,564.824988 L287.169322,564.824988 C281.896276,545.26754 277.997962,527.821458 275.474381,512.486743 C230.854476,504.457464 197,465.4323 197,418.5 C197,388.97181 210.401273,362.573655 231.453484,345.055871 C227.349851,337.983222 225,329.766029 225,321 C225,294.490332 246.490332,273 273,273 L273.516848,273.002725 L273.516848,273.002725 C278.783823,219.66548 323.776164,178 378.5,178 C395.981022,178 412.469019,182.251645 426.986338,189.77728 C440.350453,178.084255 457.847918,171 477,171 C490.487831,171 503.155028,174.513552 514.136247,180.675313 C533.28305,161.128247 559.975173,149 589.5,149 Z"
                id="Path"
                stroke="#000000"
                strokeWidth="12"
                fill="#000000"
              />
            </g>
          </g>
          <g id="notion-avatar-accessories">
            <title>Accessories/ 0</title>
            <g
              id="Accessories/-0"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            />
          </g>
          <g id="notion-avatar-details">
            <title>Details/ 0</title>
            <g
              id="Details/-0"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            />
          </g>
          <g id="notion-avatar-beard">
            <g id="Beard/ 15">
              <g id="Group">
                <g id="Combined Shape">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M369.784 644H359.784C359.784 644 341.471 799.286 411.784 857C482.098 914.714 569.784 925 615 925C660.216 925 690.216 905 707 887C723.784 869 756.082 808.293 743 804C740.172 803.072 729.363 801.658 713.81 800.202C710.947 812.016 705.396 824.233 697.53 835C696.321 836.654 695.156 838.263 694.023 839.826C675.301 865.663 665.637 879 621.229 879C574.135 879 564.884 878 525.238 840C514.752 829.95 507.447 819.544 502.766 809.407C500.067 811.055 497.593 812.617 495.291 814.07C475.74 826.412 468.584 830.929 441 814C406.784 793 369.784 644 369.784 644Z"
                    fill="black"
                  />
                  <path
                    d="M359.784 644V638C356.742 638 354.182 640.276 353.826 643.297L359.784 644ZM369.784 644L375.607 642.554C374.943 639.878 372.541 638 369.784 638V644ZM411.784 857L415.591 852.362H415.591L411.784 857ZM743 804L741.129 809.701L743 804ZM713.81 800.202L714.369 794.228C711.402 793.95 708.681 795.893 707.979 798.789L713.81 800.202ZM697.53 835L702.375 838.539L702.375 838.539L697.53 835ZM694.023 839.826L698.881 843.347H698.881L694.023 839.826ZM525.238 840L521.086 844.332H521.086L525.238 840ZM502.766 809.407L508.214 806.892C507.496 805.338 506.149 804.165 504.511 803.667C502.873 803.169 501.101 803.394 499.64 804.286L502.766 809.407ZM495.291 814.07L492.088 808.997L492.088 808.997L495.291 814.07ZM441 814L444.139 808.886L441 814ZM359.784 650H369.784V638H359.784V650ZM415.591 852.362C382.46 825.168 369.587 774.171 365.392 728.311C363.317 705.625 363.406 684.684 364.017 669.405C364.322 661.772 364.757 655.567 365.114 651.284C365.292 649.142 365.451 647.482 365.565 646.364C365.622 645.806 365.667 645.383 365.698 645.103C365.713 644.963 365.725 644.859 365.733 644.792C365.736 644.759 365.739 644.735 365.741 644.72C365.742 644.712 365.742 644.707 365.743 644.704C365.743 644.703 365.743 644.702 365.743 644.702C365.743 644.702 365.743 644.703 359.784 644C353.826 643.297 353.825 643.299 353.825 643.302C353.825 643.304 353.824 643.307 353.824 643.31C353.823 643.317 353.822 643.326 353.821 643.337C353.818 643.36 353.815 643.392 353.81 643.433C353.8 643.516 353.787 643.636 353.77 643.791C353.736 644.103 353.687 644.559 353.626 645.152C353.506 646.337 353.34 648.069 353.155 650.287C352.786 654.721 352.339 661.099 352.026 668.925C351.401 684.566 351.306 706.054 353.442 729.404C357.668 775.614 370.795 831.118 407.977 861.638L415.591 852.362ZM615 919C570.41 919 484.361 908.81 415.591 852.362L407.977 861.638C479.834 920.619 569.159 931 615 931V919ZM702.612 882.908C686.755 899.914 658.27 919 615 919V931C662.162 931 693.677 910.086 711.388 891.092L702.612 882.908ZM741.129 809.701C739.838 809.277 739.837 808.156 739.972 809.006C740.132 810.007 740.062 811.932 739.395 814.956C738.09 820.872 734.981 828.945 730.781 837.784C722.358 855.506 710.4 874.556 702.612 882.908L711.388 891.092C720.385 881.444 732.967 861.14 741.619 842.935C745.955 833.811 749.517 824.777 751.113 817.541C751.897 813.989 752.335 810.326 751.822 807.115C751.286 803.754 749.433 799.796 744.871 798.299L741.129 809.701ZM713.251 806.176C720.985 806.9 727.498 807.61 732.402 808.249C737.561 808.921 740.36 809.448 741.129 809.701L744.871 798.299C742.813 797.624 738.793 796.98 733.952 796.349C728.856 795.685 722.188 794.96 714.369 794.228L713.251 806.176ZM702.375 838.539C710.705 827.138 716.592 814.199 719.641 801.615L707.979 798.789C705.303 809.834 700.088 821.328 692.685 831.461L702.375 838.539ZM698.881 843.347C700.015 841.783 701.174 840.183 702.375 838.539L692.685 831.461C691.469 833.126 690.296 834.744 689.164 836.306L698.881 843.347ZM621.229 885C643.975 885 658.806 881.598 670.481 874.163C681.936 866.868 689.689 856.033 698.881 843.347L689.164 836.306C679.635 849.456 673.195 858.208 664.035 864.041C655.096 869.734 642.892 873 621.229 873V885ZM521.086 844.332C540.889 863.312 553.891 873.878 568.309 879.358C582.687 884.823 597.95 885 621.229 885V873C597.414 873 584.505 872.677 572.572 868.141C560.68 863.621 549.233 854.688 529.39 835.668L521.086 844.332ZM497.319 811.923C502.343 822.802 510.11 833.812 521.086 844.332L529.39 835.668C519.394 826.088 512.551 816.286 508.214 806.892L497.319 811.923ZM498.494 819.144C500.799 817.689 503.237 816.15 505.893 814.529L499.64 804.286C496.897 805.961 494.387 807.545 492.088 808.997L498.494 819.144ZM437.861 819.114C451.808 827.673 461.898 831.698 471.591 830.996C481.08 830.309 489.124 825.059 498.494 819.144L492.088 808.997C481.907 815.424 476.597 818.603 470.725 819.028C465.056 819.438 457.776 817.256 444.139 808.886L437.861 819.114ZM369.784 644C363.961 645.446 363.961 645.447 363.962 645.449C363.962 645.45 363.963 645.452 363.963 645.455C363.965 645.46 363.966 645.468 363.969 645.477C363.974 645.497 363.981 645.525 363.99 645.563C364.009 645.637 364.036 645.747 364.073 645.891C364.145 646.18 364.253 646.605 364.394 647.16C364.676 648.269 365.094 649.893 365.637 651.965C366.723 656.108 368.31 662.042 370.322 669.227C374.344 683.59 380.07 702.981 386.879 723.053C393.678 743.094 401.606 763.961 410.048 781.215C414.269 789.841 418.678 797.687 423.211 804.122C427.686 810.473 432.567 815.864 437.861 819.114L444.139 808.886C440.879 806.886 437.119 803.027 433.021 797.21C428.982 791.477 424.887 784.238 420.827 775.941C412.709 759.351 404.971 739.031 398.243 719.197C391.525 699.394 385.863 680.223 381.878 665.992C379.886 658.879 378.316 653.01 377.245 648.922C376.709 646.879 376.299 645.281 376.022 644.197C375.884 643.655 375.78 643.242 375.71 642.965C375.675 642.827 375.649 642.722 375.632 642.654C375.624 642.619 375.617 642.594 375.613 642.577C375.611 642.569 375.609 642.563 375.609 642.559C375.608 642.557 375.608 642.556 375.608 642.555C375.607 642.554 375.607 642.554 369.784 644Z"
                    fill="black"
                  />
                </g>
                <path
                  id="Path"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M698.059 729.721C698.059 729.721 701.033 737.719 699.086 738.906C697.74 739.726 669 722.832 616 723C563 723.168 534.188 739.683 532.914 738.906C530.905 737.681 533 732 534.94 729.721C541.033 724.945 571.31 714.711 602.246 712.449C606.205 712.16 610 716.002 616 716.001C622 716 626.18 712.101 629.327 712.287C661.138 714.165 691.805 724.818 698.059 729.721Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Path_2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M591 867C591 867 604.444 870 616 870C627.556 870 639 867 639 867L648 890H583L591 867Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
}

import React from "react";
import Grain from "../images/decoration/grain.png";

function Wave({ size = 40 }) {
    return (
        <svg
            viewBox="0 -2 1000 25"
            xmlns="http://www.w3.org/2000/svg"
            className="inner-wave"
            preserveAspectRatio="none"
        >
            <defs>
                <pattern
                    id="grainPattern"
                    width={size}
                    height={size}
                    patternUnits="userSpaceOnUse"
                >
                    <image xlinkHref={Grain} width={size} height={size} />
                </pattern>
            </defs>
            <path d="M0 40V10l2.004-1.256 2.004-1.236 2.004-1.196 2.004-1.138 2.004-1.062 2.004-.968 2.004-.86 2.004-.738 2.004-.604 2.004-.46 2.004-.31 2.004-.154 2.004.004 2.004.162 2.004.317 2.004.468 2.004.61 2.004.745 2.004.865 2.004.974 2.004 1.066 2.004 1.141 2.004 1.2 2.004 1.237 2.004 1.256 2.004 1.255 2.004 1.235 2.004 1.194 2.004 1.134 2.004 1.058 2.004.963 2.004.854 2.004.732 2.004.596 2.004.453 2.004.302 2.004.147 2.004-.012 2.004-.17 2.004-.325 2.004-.475 2.004-.618 2.004-.75 2.004-.872 2.004-.978 2.004-1.07 2.004-1.145 2.004-1.201 2.004-1.24 2.004-1.256 2.004-1.255 2.004-1.233 2.004-1.191 2.004-1.131 2.004-1.053 2.004-.959 2.004-.848 2.004-.725 2.004-.59 2.004-.445 2.004-.294 2.004-.139 2.005.02 2.004.178 2.004.332 2.004.483 2.004.624 2.004.757 2.004.877 2.004.984 2.004 1.074 2.004 1.148 2.004 1.204 2.004 1.24 2.004 1.257 2.004 1.254 2.004 1.231 2.004 1.19 2.004 1.127 2.004 1.049 2.004.953 2.004.842 2.004.718 2.004.583 2.004.439 2.004.286 2.004.13 2.004-.027 2.004-.186 2.004-.34 2.004-.49 2.004-.631 2.004-.763 2.004-.883 2.004-.988 2.004-1.079 2.004-1.151 2.004-1.206 2.004-1.241 2.004-1.258 2.004-1.253 2.004-1.23 2.004-1.186 2.004-1.124 2.004-1.045 2.004-.948 2.004-.836 2.004-.712 2.004-.576 2.004-.43 2.004-.28 2.004-.122 2.004.036 2.004.193 2.004.348 2.004.497 2.004.638 2.004.77 2.004.888 2.004.993 2.004 1.083 2.004 1.154 2.004 1.208 2.004 1.243 2.004 1.258 2.004 1.252 2.004 1.228 2.004 1.184 2.004 1.12 2.004 1.04 2.004.943 2.004.83 2.004.706 2.004.569 2.004.423 2.004.271 2.004.115 2.004-.044 2.004-.2 2.004-.356 2.004-.505 2.004-.645 2.004-.775 2.004-.894 2.004-.998 2.004-1.087 2.004-1.157 2.004-1.21 2.004-1.245 2.004-1.258 2.004-1.252 2.004-1.226 2.004-1.18 2.004-1.118 2.004-1.035 2.004-.937 2.004-.825 2.004-.699 2.004-.561 2.004-.416 2.004-.264 2.004-.107 2.004.052 2.004.209 2.004.363 2.004.512 2.004.651 2.004.782 2.004.9 2.004 1.003 2.004 1.09 2.004 1.16 2.004 1.213 2.004 1.245 2.004 1.259 2.004 1.25 2.004 1.225 2.004 1.178 2.004 1.114 2.004 1.03 2.004.933 2.004.818 2.004.692 2.004.555 2.004.408 2.004.256 2.004.099 2.005-.06 2.004-.216 2.004-.371 2.004-.519 2.004-.659 2.004-.788 2.004-.905 2.004-1.007 2.004-1.095 2.004-1.163L396.794 12l2.004-1.246 2.004-1.258 2.004-1.25 2.004-1.223 2.004-1.176 2.004-1.11 2.004-1.025 2.004-.927 2.004-.813 2.004-.685 2.004-.548 2.004-.4 2.004-.249L424.85 0l2.004.067 2.004.224 2.004.379 2.004.526 2.004.665 2.004.794 2.004.91 2.004 1.013 2.004 1.098 2.004 1.167 2.004 1.217 2.004 1.247 2.004 1.258 2.004 1.25 2.004 1.22 2.004 1.173 2.004 1.106 2.004 1.021 2.004.922 2.004.806 2.004.679 2.004.54 2.004.394 2.004.24 2.004.083 2.004-.075 2.004-.233 2.004-.385 2.004-.534 2.004-.672 2.004-.8 2.004-.916 2.004-1.017 2.004-1.102 2.004-1.17 2.004-1.218 2.004-1.249 2.004-1.258 2.004-1.249 2.004-1.218 2.004-1.17 2.004-1.102 2.004-1.017 2.004-.916 2.004-.8 2.004-.672 2.004-.534 2.004-.385 2.004-.233L525.05 0l2.004.083 2.004.24 2.004.394 2.004.54 2.004.679 2.004.806 2.004.922 2.004 1.021 2.004 1.106 2.004 1.173 2.004 1.22 2.004 1.25 2.004 1.258 2.004 1.247 2.004 1.217 2.004 1.167 2.004 1.098 2.004 1.012 2.004.91 2.004.795 2.004.665 2.004.526 2.004.379 2.004.224 2.004.068 2.004-.091 2.004-.248 2.004-.401 2.004-.548 2.004-.685 2.004-.813 2.004-.927 2.004-1.026 2.004-1.11 2.004-1.175 2.004-1.222 2.004-1.25 2.004-1.259L603.206 8l2.004-1.215 2.004-1.163 2.004-1.095 2.004-1.007 2.004-.905 2.004-.788 2.004-.66 2.004-.518 2.004-.37 2.004-.217 2.005-.06 2.004.1 2.004.255 2.004.408 2.004.555 2.004.692 2.004.818 2.004.933 2.004 1.03 2.004 1.114 2.004 1.178 2.004 1.224 2.004 1.251 2.004 1.259 2.004 1.245 2.004 1.212 2.004 1.16 2.004 1.091 2.004 1.003 2.004.9 2.004.782 2.004.651 2.004.512 2.004.363 2.004.21 2.004.05 2.004-.106 2.004-.264 2.004-.416 2.004-.561 2.004-.699 2.004-.825 2.004-.937 2.004-1.035 2.004-1.117 2.004-1.181 2.004-1.226 2.004-1.252 2.004-1.258 2.004-1.244 2.004-1.21 2.004-1.158 2.004-1.087 2.004-.998 2.004-.894 2.004-.775 2.004-.645 2.004-.505 2.004-.355 2.004-.201 2.004-.044 2.004.115 2.004.27 2.004.424 2.004.569 2.004.705 2.004.83 2.004.943 2.004 1.04 2.004 1.121 2.004 1.184 2.004 1.228 2.004 1.252 2.004 1.258 2.004 1.243 2.004 1.208 2.004 1.154 2.004 1.083 2.004.993 2.004.888 2.004.77 2.004.638 2.004.497 2.004.348 2.004.193 2.004.036 2.004-.123 2.004-.278 2.004-.431 2.004-.576 2.004-.712 2.004-.836 2.004-.948 2.004-1.045 2.004-1.124 2.004-1.186 2.004-1.23 2.004-1.253 2.004-1.258 2.004-1.241 2.004-1.206 2.004-1.151 2.004-1.079 2.004-.988 2.004-.883 2.004-.763 2.004-.631 2.004-.49 2.004-.34 2.004-.186 2.004-.028 2.004.13 2.004.287 2.004.439 2.004.583 2.004.718 2.004.842 2.004.953 2.004 1.05 2.004 1.127 2.004 1.189 2.004 1.231 2.004 1.254 2.004 1.257 2.004 1.24 2.004 1.204 2.004 1.148 2.004 1.074 2.004.984 2.004.877 2.004.757 2.004.624 2.004.483 2.004.332 2.004.178 2.005.02 2.004-.139 2.004-.294 2.004-.445 2.004-.59 2.004-.725 2.004-.848 2.004-.959 2.004-1.053 2.004-1.131 2.004-1.191 2.004-1.233 2.004-1.255 2.004-1.257 2.004-1.239 2.004-1.2 2.004-1.146 2.004-1.07 2.004-.978 2.004-.872 2.004-.75 2.004-.618 2.004-.475 2.004-.325 2.004-.17 2.004-.012 2.004.147 2.004.302 2.004.453 2.004.596 2.004.732 2.004.854 2.004.963 2.004 1.058 2.004 1.134 2.004 1.194 2.004 1.235 2.004 1.255 2.004 1.256 2.004 1.238 2.004 1.199 2.004 1.141 2.004 1.066 2.004.974 2.004.865 2.004.744 2.004.611 2.004.468 2.004.317 2.004.162 2.004.004 2.004-.154 2.004-.31 2.004-.46 2.004-.604 2.004-.738 2.004-.86 2.004-.968 2.004-1.062 2.004-1.138 2.004-1.196 2.004-1.236L1000 10v30H0Z" />
            <path
                fill="url(#grainPattern)"
                d="M0 40V10l2.004-1.256 2.004-1.236 2.004-1.196 2.004-1.138 2.004-1.062 2.004-.968 2.004-.86 2.004-.738 2.004-.604 2.004-.46 2.004-.31 2.004-.154 2.004.004 2.004.162 2.004.317 2.004.468 2.004.61 2.004.745 2.004.865 2.004.974 2.004 1.066 2.004 1.141 2.004 1.2 2.004 1.237 2.004 1.256 2.004 1.255 2.004 1.235 2.004 1.194 2.004 1.134 2.004 1.058 2.004.963 2.004.854 2.004.732 2.004.596 2.004.453 2.004.302 2.004.147 2.004-.012 2.004-.17 2.004-.325 2.004-.475 2.004-.618 2.004-.75 2.004-.872 2.004-.978 2.004-1.07 2.004-1.145 2.004-1.201 2.004-1.24 2.004-1.256 2.004-1.255 2.004-1.233 2.004-1.191 2.004-1.131 2.004-1.053 2.004-.959 2.004-.848 2.004-.725 2.004-.59 2.004-.445 2.004-.294 2.004-.139 2.005.02 2.004.178 2.004.332 2.004.483 2.004.624 2.004.757 2.004.877 2.004.984 2.004 1.074 2.004 1.148 2.004 1.204 2.004 1.24 2.004 1.257 2.004 1.254 2.004 1.231 2.004 1.19 2.004 1.127 2.004 1.049 2.004.953 2.004.842 2.004.718 2.004.583 2.004.439 2.004.286 2.004.13 2.004-.027 2.004-.186 2.004-.34 2.004-.49 2.004-.631 2.004-.763 2.004-.883 2.004-.988 2.004-1.079 2.004-1.151 2.004-1.206 2.004-1.241 2.004-1.258 2.004-1.253 2.004-1.23 2.004-1.186 2.004-1.124 2.004-1.045 2.004-.948 2.004-.836 2.004-.712 2.004-.576 2.004-.43 2.004-.28 2.004-.122 2.004.036 2.004.193 2.004.348 2.004.497 2.004.638 2.004.77 2.004.888 2.004.993 2.004 1.083 2.004 1.154 2.004 1.208 2.004 1.243 2.004 1.258 2.004 1.252 2.004 1.228 2.004 1.184 2.004 1.12 2.004 1.04 2.004.943 2.004.83 2.004.706 2.004.569 2.004.423 2.004.271 2.004.115 2.004-.044 2.004-.2 2.004-.356 2.004-.505 2.004-.645 2.004-.775 2.004-.894 2.004-.998 2.004-1.087 2.004-1.157 2.004-1.21 2.004-1.245 2.004-1.258 2.004-1.252 2.004-1.226 2.004-1.18 2.004-1.118 2.004-1.035 2.004-.937 2.004-.825 2.004-.699 2.004-.561 2.004-.416 2.004-.264 2.004-.107 2.004.052 2.004.209 2.004.363 2.004.512 2.004.651 2.004.782 2.004.9 2.004 1.003 2.004 1.09 2.004 1.16 2.004 1.213 2.004 1.245 2.004 1.259 2.004 1.25 2.004 1.225 2.004 1.178 2.004 1.114 2.004 1.03 2.004.933 2.004.818 2.004.692 2.004.555 2.004.408 2.004.256 2.004.099 2.005-.06 2.004-.216 2.004-.371 2.004-.519 2.004-.659 2.004-.788 2.004-.905 2.004-1.007 2.004-1.095 2.004-1.163L396.794 12l2.004-1.246 2.004-1.258 2.004-1.25 2.004-1.223 2.004-1.176 2.004-1.11 2.004-1.025 2.004-.927 2.004-.813 2.004-.685 2.004-.548 2.004-.4 2.004-.249L424.85 0l2.004.067 2.004.224 2.004.379 2.004.526 2.004.665 2.004.794 2.004.91 2.004 1.013 2.004 1.098 2.004 1.167 2.004 1.217 2.004 1.247 2.004 1.258 2.004 1.25 2.004 1.22 2.004 1.173 2.004 1.106 2.004 1.021 2.004.922 2.004.806 2.004.679 2.004.54 2.004.394 2.004.24 2.004.083 2.004-.075 2.004-.233 2.004-.385 2.004-.534 2.004-.672 2.004-.8 2.004-.916 2.004-1.017 2.004-1.102 2.004-1.17 2.004-1.218 2.004-1.249 2.004-1.258 2.004-1.249 2.004-1.218 2.004-1.17 2.004-1.102 2.004-1.017 2.004-.916 2.004-.8 2.004-.672 2.004-.534 2.004-.385 2.004-.233L525.05 0l2.004.083 2.004.24 2.004.394 2.004.54 2.004.679 2.004.806 2.004.922 2.004 1.021 2.004 1.106 2.004 1.173 2.004 1.22 2.004 1.25 2.004 1.258 2.004 1.247 2.004 1.217 2.004 1.167 2.004 1.098 2.004 1.012 2.004.91 2.004.795 2.004.665 2.004.526 2.004.379 2.004.224 2.004.068 2.004-.091 2.004-.248 2.004-.401 2.004-.548 2.004-.685 2.004-.813 2.004-.927 2.004-1.026 2.004-1.11 2.004-1.175 2.004-1.222 2.004-1.25 2.004-1.259L603.206 8l2.004-1.215 2.004-1.163 2.004-1.095 2.004-1.007 2.004-.905 2.004-.788 2.004-.66 2.004-.518 2.004-.37 2.004-.217 2.005-.06 2.004.1 2.004.255 2.004.408 2.004.555 2.004.692 2.004.818 2.004.933 2.004 1.03 2.004 1.114 2.004 1.178 2.004 1.224 2.004 1.251 2.004 1.259 2.004 1.245 2.004 1.212 2.004 1.16 2.004 1.091 2.004 1.003 2.004.9 2.004.782 2.004.651 2.004.512 2.004.363 2.004.21 2.004.05 2.004-.106 2.004-.264 2.004-.416 2.004-.561 2.004-.699 2.004-.825 2.004-.937 2.004-1.035 2.004-1.117 2.004-1.181 2.004-1.226 2.004-1.252 2.004-1.258 2.004-1.244 2.004-1.21 2.004-1.158 2.004-1.087 2.004-.998 2.004-.894 2.004-.775 2.004-.645 2.004-.505 2.004-.355 2.004-.201 2.004-.044 2.004.115 2.004.27 2.004.424 2.004.569 2.004.705 2.004.83 2.004.943 2.004 1.04 2.004 1.121 2.004 1.184 2.004 1.228 2.004 1.252 2.004 1.258 2.004 1.243 2.004 1.208 2.004 1.154 2.004 1.083 2.004.993 2.004.888 2.004.77 2.004.638 2.004.497 2.004.348 2.004.193 2.004.036 2.004-.123 2.004-.278 2.004-.431 2.004-.576 2.004-.712 2.004-.836 2.004-.948 2.004-1.045 2.004-1.124 2.004-1.186 2.004-1.23 2.004-1.253 2.004-1.258 2.004-1.241 2.004-1.206 2.004-1.151 2.004-1.079 2.004-.988 2.004-.883 2.004-.763 2.004-.631 2.004-.49 2.004-.34 2.004-.186 2.004-.028 2.004.13 2.004.287 2.004.439 2.004.583 2.004.718 2.004.842 2.004.953 2.004 1.05 2.004 1.127 2.004 1.189 2.004 1.231 2.004 1.254 2.004 1.257 2.004 1.24 2.004 1.204 2.004 1.148 2.004 1.074 2.004.984 2.004.877 2.004.757 2.004.624 2.004.483 2.004.332 2.004.178 2.005.02 2.004-.139 2.004-.294 2.004-.445 2.004-.59 2.004-.725 2.004-.848 2.004-.959 2.004-1.053 2.004-1.131 2.004-1.191 2.004-1.233 2.004-1.255 2.004-1.257 2.004-1.239 2.004-1.2 2.004-1.146 2.004-1.07 2.004-.978 2.004-.872 2.004-.75 2.004-.618 2.004-.475 2.004-.325 2.004-.17 2.004-.012 2.004.147 2.004.302 2.004.453 2.004.596 2.004.732 2.004.854 2.004.963 2.004 1.058 2.004 1.134 2.004 1.194 2.004 1.235 2.004 1.255 2.004 1.256 2.004 1.238 2.004 1.199 2.004 1.141 2.004 1.066 2.004.974 2.004.865 2.004.744 2.004.611 2.004.468 2.004.317 2.004.162 2.004.004 2.004-.154 2.004-.31 2.004-.46 2.004-.604 2.004-.738 2.004-.86 2.004-.968 2.004-1.062 2.004-1.138 2.004-1.196 2.004-1.236L1000 10v30H0Z"
            />
        </svg>
    );
}

export default Wave;
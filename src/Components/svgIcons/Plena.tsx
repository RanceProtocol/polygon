import { FC } from "react";

interface IProps {
    width: string;
    className: string;
}
export const Plena: FC<IProps> = ({ width, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "40px"}
        height={65}
        fill="none"
        className={className}
    >
        <mask
            id="a"
            width={52}
            height={46}
            x={0}
            y={1}
            maskUnits="userSpaceOnUse"
            style={{
                maskType: "alpha",
            }}
        >
            <path
                fill="#000"
                d="m14.754 19.346-.37 1.215c-.445 1.481-1.78 2.507-3.337 2.507-2.335 0-4.003-2.317-3.336-4.596l.371-1.215c.445-1.482 1.78-2.507 3.336-2.507 2.336 0 4.004 2.317 3.336 4.596Z"
            />
            <path
                fill="#000"
                d="M51.636 18.928c0 9.647-7.636 17.47-17.051 17.47H21.648l-1.964 8.736a1.872 1.872 0 0 1-1.817 1.482h-.89c-2.965 0-5.189-2.849-4.521-5.811l1-4.406 1.335-6.001c.296-1.405 1.52-2.393 2.891-2.393h11.862a2.49 2.49 0 0 0 2.372-1.709c.074-.266.111-.532.111-.76 0-1.329-1.038-2.468-2.41-2.468H21.5c-1.965 0-3.558-1.444-3.93-3.229-.11-.57-.147-1.177 0-1.785V17.94c.446-1.899 2.077-3.228 3.967-3.228h11.01c1.037 0 2.038-.646 2.371-1.671.075-.266.149-.532.149-.836 0-1.329-1.038-2.468-2.41-2.468H4.078C1.335 9.813-.629 7.077.186 4.419.706 2.634 2.3 1.457 4.078 1.457h30.507c9.415 0 17.05 7.824 17.05 17.47Z"
            />
        </mask>
        <g mask="url(#a)">
            <path fill="url(#b)" d="M-9.182 61.669V.202h66.11V61.67h-66.11Z" />
        </g>
        <path
            fill="#fff"
            d="M75.942 28.455v18.16h-7.094V4.266c0-1.986 1.592-3.603 3.547-3.603s3.547 1.617 3.547 3.603v.588C78.114 1.912 81.734 0 86.005 0c7.819 0 15.276 5.956 15.276 16.396 0 10.368-7.747 16.323-15.203 16.323-4.272.074-7.964-1.47-10.136-4.264Zm18.316-12.132c0-5.441-4.054-9.706-9.339-9.706-5.43 0-9.339 4.412-9.194 9.926.145 5.368 4.489 9.853 9.774 9.559 4.922-.294 8.76-4.485 8.76-9.78ZM104.25 3.97v28.161h7.239V3.971c0-1.986-1.593-3.677-3.62-3.677s-3.619 1.691-3.619 3.676ZM114.601 16.47c0-9.19 7.022-16.47 16.072-16.47 9.194 0 15.927 6.911 15.927 16.176v2.72h-25.194c1.014 4.485 4.416 7.426 9.556 7.426 4.054 0 7.095-2.132 8.615-5.514l5.864 3.456c-2.678 5.146-7.456 8.529-14.479 8.529-9.773 0-16.361-7.206-16.361-16.323Zm7.167-3.603h17.592c-1.086-4.264-4.271-6.47-8.687-6.47-4.272 0-7.602 2.647-8.905 6.47ZM149.786.662h7.094v3.897c2.1-2.72 5.213-4.486 9.267-4.486 7.819 0 12.307 4.927 12.307 13.456v15c0 2.058-1.593 3.676-3.62 3.676s-3.619-1.618-3.619-3.677V14.264c0-4.926-2.317-7.94-7.023-7.94-4.054 0-7.239 3.014-7.239 8.528v17.279h-7.167V.66ZM181.567 16.47c0-10.44 7.529-16.397 15.348-16.397 4.054 0 7.674 1.692 9.99 4.412v-.147c0-1.985 1.593-3.603 3.548-3.603 1.954 0 3.547 1.618 3.547 3.603v27.867h-7.167v-4.118c-2.244 2.941-6.009 4.706-10.063 4.706-7.384 0-15.203-6.03-15.203-16.323Zm25.7.515c.362-5.662-3.692-10.294-9.266-10.294-5.285 0-9.412 4.264-9.412 9.705 0 5.368 3.982 9.632 9.122 9.78 5.14.073 9.267-4.045 9.556-9.191ZM136.776 42.93v1.323h-4.13v2.915h3.22v1.322h-3.22v4.322h-1.596v-9.881h5.726ZM143.851 42.93v9.883h-1.596V42.93h1.596ZM157.94 52.813h-1.596l-4.802-7.38v7.38h-1.596v-9.897h1.596l4.802 7.366v-7.366h1.596v9.897ZM169.902 50.793h-4.074l-.7 2.02h-1.666l3.486-9.897h1.848l3.486 9.897h-1.68l-.7-2.02Zm-.448-1.322-1.582-4.593-1.596 4.593h3.178ZM185.792 52.813h-1.596l-4.802-7.38v7.38h-1.596v-9.897h1.596l4.802 7.366v-7.366h1.596v9.897ZM191.356 47.85c0-.967.219-1.834.658-2.602a4.783 4.783 0 0 1 1.806-1.791 4.972 4.972 0 0 1 2.506-.654c1.036 0 1.955.26 2.758.782.812.511 1.4 1.241 1.764 2.19h-1.918c-.252-.522-.602-.91-1.05-1.167-.448-.256-.966-.384-1.554-.384-.644 0-1.218.147-1.722.441a3.092 3.092 0 0 0-1.19 1.266c-.28.55-.42 1.19-.42 1.92 0 .729.14 1.369.42 1.919.289.55.686.976 1.19 1.28.504.293 1.078.44 1.722.44.588 0 1.106-.128 1.554-.384.448-.256.798-.644 1.05-1.166h1.918c-.364.948-.952 1.678-1.764 2.19-.803.512-1.722.768-2.758.768a5.01 5.01 0 0 1-2.506-.64 4.891 4.891 0 0 1-1.806-1.806c-.439-.768-.658-1.635-.658-2.602ZM208.312 44.239v2.9h3.36v1.323h-3.36v3.028h3.78v1.322h-5.376v-9.896h5.376v1.323h-3.78Z"
        />
        <defs>
            <radialGradient
                id="b"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="matrix(37.83858 -27.5869 25.22636 34.60083 2.183 34.242)"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#85EAFF" />
                <stop offset={0.706} stopColor="#DADADA" />
                <stop offset={1} stopColor="#FFCB80" />
            </radialGradient>
        </defs>
    </svg>
);
export default Plena;

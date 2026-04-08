import type { ReactNode } from "react";

export default function MetadataImage({
  title,
  description,
  primaryColor,
  primaryTextColor,
}: {
  title: ReactNode;
  description: ReactNode;
  primaryColor: string;
  primaryTextColor: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#050505",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        color: "white",
        backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, transparent)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "90px 60px 90px 60px",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "40px",
            textWrap: "pretty",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 44,
              color: "#a1a1aa",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: "95%",
              letterSpacing: "-0.01em",
              lineClamp: 2,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {description}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <img src="https://wiki.soncresity.industries/icons/si.png"
            style={{
              maxWidth: 96,
            }} />
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "white",
              opacity: 0.9,
            }}
          >
            Wiki
          </span>
          <div style={{ display: "flex", flexGrow: 1 }} />
        </div>
      </div>
    </div>
  );
}

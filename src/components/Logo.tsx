import logoSrc from "../assets/vault1.png";

export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <img
      src={logoSrc}
      alt="Vault1"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

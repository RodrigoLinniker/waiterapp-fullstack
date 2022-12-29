import Logo from "../../assets/logo.svg";

export function Header() {
  return (
    <div className="w-full bg-[#D73035] py-7 px-28">
      <div className="w-full max-w-[1440px] flex justify-between items-center mx-auto">
        <div className="flex flex-col gap-2">
          <strong className="text-[#FFFFFF] text-3xl font-semibold">
            Pedidos
          </strong>
          <h1 className="text-[#ffffff]">Acompanhe os pedidos dos clientes</h1>
        </div>
        <div>
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
}

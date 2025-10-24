import { memo } from "react";

const HeaderCategoryView = ({ categoriesData }: any) => {
  return (
    <div className="container pt-4 h-full p-2">
      <h2 className="text-2xl italic font-sans">Explore all devices</h2>
      <div className="flex gap-10 pt-10 ">
        {categoriesData?.map((e: any, inx: string) => (
          <div className="text-[16px]" key={inx}>
            <p>{e.name}</p>
            <div className="text-[14px] pt-4 flex flex-col gap-2">
              {e.columns?.map((e: any, inx: string) => (
                <div key={inx} className="relative group align-bottom">
                  <span className="cursor-pointer hover:text-indigo-500 transition-all duration-300">
                    {e.title}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(HeaderCategoryView);

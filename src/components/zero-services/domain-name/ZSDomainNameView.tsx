import { addToast, Button, form, Spinner } from "@heroui/react";
import { RecordDomainType } from "../../../api-client/model/enum/RecordDomainType";
import type { DomainName } from "../../../api-client/model/table/DomainName";
import { ZSDomainNameFormModal, type ZSDomainNameFormData } from "./ZSDomainNameFormModal";
import { useEffect, useState } from "react";
import { ZSDomainNameDeleteModal } from "./ZSDomainNameDeleteModal";
import { AxiosClient } from "../../../api-client/AxiosClient";
import { ZSUtility } from "../zero-service-utility";

interface ZSDomainNameViewProps {}

export function ZSDomainNameView(props: ZSDomainNameViewProps) {
  const [list_domain, setListDomain] = useState<DomainName[]>([]);
  const [form_open, setFormOpen] = useState<boolean>(false);
  const [delete_modal_open, setDeleteModalOpen] = useState<boolean>(false);
  const [selected_dn, setSelectedDN] = useState<DomainName>();
  const [active_value, setActiveValue] = useState<ZSDomainNameFormData>({
    name: '',
    record_type: '' as any,
    record_value: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loading_submit, setLoadingSubmit] = useState<boolean>(false);
  const [loading_delete, setLoadingDelete] = useState<boolean>(false);

  async function init() {
    try {
      setLoading(true);
      setListDomain(await AxiosClient.getDomains({ headers: { authorization: ZSUtility.getToken() } }));
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoading(false);
    }
  }

  async function submitDomain() {
    try {
      setLoadingSubmit(true);
      if (selected_dn) {
        await AxiosClient.updateDomain({
          headers: { authorization: ZSUtility.getToken() },
          body: active_value,
          path: { domain_name: selected_dn.name }
        });
        addToast({
          title: 'Domain Update',
          description: `Domain ${selected_dn.name}.d.naiv.dev updated successfully`
        });
      } else {
        await AxiosClient.createDomain({
          headers: { authorization: ZSUtility.getToken() },
          body: active_value
        });
        addToast({
          title: 'New Domain Added',
          description: `New domain ${active_value.name}.d.naiv.dev added`
        });
      }
      await init();
      setFormOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  async function deleteDomain() {
    if (!selected_dn) {
      return;
    }
    try {
      setLoadingDelete(true);
      await AxiosClient.deleteDomain({
        headers: { authorization: ZSUtility.getToken() },
        path: { domain_name: selected_dn.name }
      });
      addToast({
        title: 'Domain Deleted',
        description: `Domain ${active_value.name}.d.naiv.dev permanently deleted`
      });
      await init();
      setDeleteModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.response?.data?.toString()
      });
    } finally {
      setLoadingDelete(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button 
          variant="shadow"
          color="danger"
          className="self-start mb-1"
          onPress={() => {
            setSelectedDN(undefined);
            setActiveValue({
              name: '',
              record_type: '' as any,
              record_value: ''
            });
            setFormOpen(true);
          }}>
          + Add New Domain
        </Button>
        { loading && <Spinner color={'warning'} className="self-start" /> }
        {
          !loading && list_domain.map(dn => (
            <div
              key={dn.id}
              className={`
                bg-[#FFF1] flex flex-col gap-0 p-[12px_16px] rounded-2xl
                lg:flex-row lg:items-center lg:justify-between
              `}>
              <div className="flex flex-col gap-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-bold text-red-400">
                    { dn.record_type }
                  </div>
                  <div className="">
                    <span className="">
                      { dn.name }
                    </span>
                    <span className="opacity-60">
                      .d.naiv.dev
                    </span>
                  </div>
                </div>
                <div className="text-yellow-300 font-mono">
                  { dn.record_value }
                </div>
              </div>
              <div className={`
                flex items-center gap-2 mt-2
                lg:mt-0
              `}>
                <Button 
                  onPress={() => {
                    setSelectedDN(dn);
                    setDeleteModalOpen(true);
                  }}
                  className="!min-w-0 !w-10 !px-0">
                  <img 
                    className="w-5 h-5 object-contain"
                    src={'/trash-yellow.svg'} />
                </Button>
                <Button 
                  onPress={() => {
                    setSelectedDN(dn);
                    setActiveValue({
                      name: dn.name,
                      record_type: dn.record_type,
                      record_value: dn.record_value
                    });
                    setFormOpen(true);
                  }}
                  className="!min-w-0 !w-10 !px-0">
                  <img 
                    className="w-4 h-4 object-contain"
                    src={'/pencil-sky.svg'} />
                </Button>
              </div>
            </div>
          ))
        }
        <div className="text-zinc-500 italic">
          You can add up to { ZSUtility.getUser()?.max_domain_name_allowed } domain name.
        </div>
      </div>
      <ZSDomainNameFormModal 
        data={selected_dn}
        value={active_value}
        setValue={setActiveValue}
        open={form_open} 
        setOpen={setFormOpen}
        loading={loading_submit}
        onSubmit={submitDomain} />
      { selected_dn && <ZSDomainNameDeleteModal
        data={selected_dn}
        open={delete_modal_open}
        setOpen={setDeleteModalOpen}
        loading={loading_delete}
        onYes={deleteDomain} /> }
    </>
  );
}

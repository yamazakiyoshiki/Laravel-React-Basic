import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Index({ auth, projects, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th onClick={(e) => sortChanged("id")}>
                        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                          ID
                          <div>
                            <ChevronUpIcon
                              className={
                                "w-4 " + // スペースを追加
                                (queryParams.sort_field === "id" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white" // 条件が一致した場合に適用
                                  : "")
                              }
                            />
                            <ChevronDownIcon
                              className={
                                "w-4 -mt-2 " + // スペースを追加
                                (queryParams.sort_field === "id" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white" // 条件が一致した場合に適用
                                  : "")
                              }
                            />
                          </div>
                        </div>
                      </th>
                      <th
                        onClick={(e) => sortChanged("")}
                        className="px-3 py-3"
                      >
                        Image
                      </th>
                      <th onClick={(e) => sortChanged("name")}>
                        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                          Name
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("status")}>
                        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                          Status
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("created_at")}>
                        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                          Created Date
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("due_date")}>
                        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                          Due Date
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th className="px-3 py-3">Created By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={project.id}
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img src={project.image_path} style={{ width: 60 }} />
                        </td>
                        <td className="px-3 py-2">{project.name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " + // スペースを追加
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2">
                          <Link
                            href={route("project.edit", project.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:*:underline mx-1"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("project.destroy", project.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:*:underline mx-1"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
              {/* <pre>{JSON.stringify(projects.meta.links, null, 2)}</pre> */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

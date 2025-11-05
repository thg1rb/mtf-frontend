import type { GetAgentResponse, CreateAgentRequest, UpdateAgentRequest } from './types';
import type { AgentFormData } from '@/lib/validations';

/**
 * Transforms API response data to form data format
 * Maps the API response structure to the form field requirements
 */
export function transformAgentResponseToFormData(
  agentData: GetAgentResponse
): Partial<AgentFormData> {
  return {
    // Map id to citizenId for form compatibility
    citizenId: agentData.id,
    email: agentData.email,
    firstname: agentData.firstname,
    lastname: agentData.lastname,
    status: agentData.status,
    addressDetails: agentData.address.addrDetailTh,
    subDistrict: agentData.address.subDistrictTh,
    district: agentData.address.districtTh,
    province: agentData.address.provinceTh,
    // Transform postalCode to postelCode for form compatibility
    postelCode: agentData.address.postalCode,
  };
}

/**
 * Transforms form data to create agent request format
 * Maps form data to API request structure
 */
export function transformFormDataToCreateAgentRequest(
  formData: AgentFormData
): CreateAgentRequest {
  return {
    id: formData.citizenId,
    firstName: formData.firstname,
    lastName: formData.lastname,
    email: formData.email,
    status: formData.status,
    address: {
      addrDetailTh: formData.addressDetails,
      subDistrictTh: formData.subDistrict,
      districtTh: formData.district,
      provinceTh: formData.province,
      postalCode: formData.postelCode,
    },
  };
}

/**
 * Transforms form data to update agent request format
 * Maps form data to API request structure for partial updates
 */
export function transformFormDataToUpdateAgentRequest(
  formData: AgentFormData
): UpdateAgentRequest {
  return {
    firstName: formData.firstname,
    lastName: formData.lastname,
    email: formData.email,
    status: formData.status,
    address: {
      addrDetailTh: formData.addressDetails,
      subDistrictTh: formData.subDistrict,
      districtTh: formData.district,
      provinceTh: formData.province,
      postalCode: formData.postelCode,
    },
  };
}
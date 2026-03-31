// Generates LICENSE.txt content for extension packages

/**
 * Returns the full GNU Affero General Public License v3 text
 * with System Initiative, Inc. as the copyright holder.
 */
export function generateLicense(): string {
  const year = new Date().getFullYear();
  return `Copyright (C) ${year} System Initiative, Inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
`;
}
